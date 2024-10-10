// Infrastructure/Services/Authentifaction/AuthenticationService.cs
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities.Enum;
using Core.Entities.User;
using Core.Repository;
using Infrastructure.DTO.Authentication;
using Infrastructure.DTO.User;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services.Authentifaction
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtService _jwtService;
        private readonly IRepository<User> _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<AuthenticationService> _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthenticationService(
            IJwtService jwtService,
            IRepository<User> userRepository,
            IHttpContextAccessor httpContextAccessor,
            ILogger<AuthenticationService> logger,
            IConfiguration configuration,
            IMapper mapper
        )
        {
            _jwtService = jwtService;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<LoginResponseDTO> Login(string email, string password)
        {
            try
            {
                var user = await _userRepository.FindAsync(u => u.Email == email);
                if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                {
                    _logger.LogWarning($"Authentication failed for email: {email}");
                    throw new AuthenticationException("Invalid email or password.");
                }

                var token = _jwtService.GenerateToken(user); // Implement IJwtService accordingly

                _logger.LogInformation($"User logged in: {user.Email}");

                // Return the token
                return new LoginResponseDTO { Token = token, Message = "Logged in successfully." };
            }
            catch (Exception ex)
            {
                var user = await _userRepository.FindAsync(u => u.Email == email);

                if (user != null)
                {
                    _logger.LogInformation(
                        $"User found: {user.Email}, ID: {user.Id}, UserType: {user.UserTypeId}"
                    );
                }

                _logger.LogError(
                    $"An error occurred during login for user {email}. Exception: {ex.Message}. Stack Trace: {ex.StackTrace}"
                );
                throw;
            }
        }

        public async Task<bool> Logout()
        {
            // Since JWT is stateless, logout can be handled on the client side by deleting the cookie
            // Alternatively, implement token blacklisting if needed
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

        public async Task<UserDTO> Status(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                _logger.LogWarning("GetUserStatus called with null or empty email.");
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
