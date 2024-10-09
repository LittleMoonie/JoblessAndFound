using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Authentication;
using Core.Entities.Enum;
using Core.Entities.User;
using Core.Repository;
using Infrastructure.Data;
using Infrastructure.DTO.User;
using Infrastructure.Services.IServices.Authentification;
using Infrastructure.Utility;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using IAuthenticationService = Infrastructure.Services.IServices.Authentification.IAuthenticationService;

namespace Infrastructure.Services.Authentifaction
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;

        public AuthenticationService(
            IRepository<User> userRepository,
            IHttpContextAccessor httpContextAccessor,
            DataContext context
        )
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        public async Task<string> AuthenticateUser(string email, string password)
        {
            var user = await _userRepository.FindAsync(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null; // Invalid credentials
            }

            // Fetch the currently active key
            var activeKey = await _context
                .JwtKeys.Where(k => k.IsActive)
                .OrderByDescending(k => k.CreatedAt)
                .Select(k => k.KeyValue)
                .FirstOrDefaultAsync();

            if (string.IsNullOrEmpty(activeKey))
            {
                throw new InvalidOperationException("No active JWT key found.");
            }

            // Generate JWT token using the active key
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                    }
                ),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(activeKey)),
                    SecurityAlgorithms.HmacSha256Signature
                ),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<bool> Logout()
        {
            // Sign out the user by removing the authentication cookie
            await _httpContextAccessor.HttpContext.SignOutAsync();
            return true;
        }

        public async Task<UserDTO> GetUserStatus(string email)
        {
            // Find user based on email
            var user = await _userRepository.FindAsync(u => u.Email == email);
            if (user == null)
                return null;

            // Return mapped UserDTO
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

        // Method to generate a secure key
        public string CreateSecureKey(int length = 32)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[length];
                rng.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }

        public async Task<string> GenerateAndStoreNewJwtKey()
        {
            var newKeyValue = GenerateSecureKey(); // Assuming you have a method to generate secure keys
            var newKey = new JwtKey
            {
                KeyValue = newKeyValue,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
            };

            // Mark all existing keys as inactive
            var existingKeys = await _context.JwtKeys.ToListAsync();
            foreach (var key in existingKeys)
            {
                key.IsActive = false;
            }

            // Store the new key
            await _context.JwtKeys.AddAsync(newKey);
            await _context.SaveChangesAsync();

            return newKeyValue; // Return the new key
        }

        private string GenerateSecureKey(int length = 32)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[length];
                rng.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }
    }
}
