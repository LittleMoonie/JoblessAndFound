using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Core.Entities.Enum;
using Core.Entities.User;
using Core.Repository;
using Infrastructure.Data;
using Infrastructure.DTO.User;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using IAuthenticationService = Infrastructure.Services.IServices.Authentification.IAuthenticationService;

namespace Infrastructure.Services.Authentifaction
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtService _jwtService;
        private readonly IRepository<User> _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor; // Inject IHttpContextAccessor directly
        private readonly ILogger<AuthenticationService> _logger;

        public AuthenticationService(
            IJwtService jwtService,
            IRepository<User> userRepository,
            IHttpContextAccessor httpContextAccessor, // Inject IHttpContextAccessor
            ILogger<AuthenticationService> logger
        )
        {
            _jwtService = jwtService;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }

        public async Task<string> AuthenticateUser(string email, string password)
        {
            var user = await _userRepository.FindAsync(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                _logger.LogWarning($"Authentication failed for email: {email}");
                return null; // Return null if credentials are invalid
            }

            var activeKey = await _jwtService.GetActiveKeyAsync();

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim("UserTypeId", user.UserTypeId.ToString()),
                    }
                ),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(activeKey)),
                    SecurityAlgorithms.HmacSha256Signature
                ),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            _logger.LogInformation($"JWT token generated for user: {user.Email}");
            return tokenHandler.WriteToken(token);
        }

        public async Task<bool> Logout()
        {
            await _httpContextAccessor.HttpContext.SignOutAsync(); // Use injected IHttpContextAccessor
            return true;
        }

        public async Task<bool> IsAuthenticatedAsync(ClaimsPrincipal user)
        {
            if (!user.Identity.IsAuthenticated)
            {
                _logger.LogWarning("User is not authenticated");
                return false;
            }

            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                _logger.LogWarning("NameIdentifier claim not found");
                return false;
            }

            var emailClaim = user.FindFirst(ClaimTypes.Email);
            if (emailClaim == null || string.IsNullOrEmpty(emailClaim.Value))
            {
                _logger.LogWarning("Email claim not found or empty");
                return false;
            }

            return true;
        }

        public async Task<UserDTO> GetUserStatus(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                _logger.LogWarning("GetUserStatus called with null or empty email");
                return null;
            }

            var user = await _userRepository.FindAsync(u => u.Email == email);
            if (user == null)
            {
                _logger.LogWarning($"No user found for email: {email}");
                return null;
            }

            return new UserDTO
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserType = (UserTypeEnum)user.UserTypeId,
            };
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _userRepository.FindAsync(u => u.Email == email);
        }
    }
}
