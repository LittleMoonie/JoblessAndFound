// Infrastructure/Services/Authentifaction/JwtKeyService.cs
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Authentication;
using Core.Entities.User;
using Infrastructure.Data;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services.Authentifaction
{
    public class JwtService : IJwtService
    {
        private readonly DataContext _context;

        public JwtService(DataContext context)
        {
            _context = context;
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(GetActiveKeyAsync().Result);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(
                            "UserTypeId",
                            user.UserTypeId.ToString()
                        ) // Include UserTypeId in the JWT claims
                        ,
                    }
                ),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                ),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<string> GetActiveKeyAsync()
        {
            var activeKey = await _context
                .JwtKeys.Where(k => k.IsActive)
                .OrderByDescending(k => k.CreatedAt)
                .Select(k => k.KeyValue)
                .FirstOrDefaultAsync();

            if (string.IsNullOrEmpty(activeKey))
            {
                throw new InvalidOperationException("No active JWT key found.");
            }

            return activeKey;
        }

        public async Task GenerateAndStoreNewJwtKeyAsync()
        {
            // Generate a new JWT key
            var newKey = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));

            // Mark all existing keys as inactive
            var existingKeys = await _context.JwtKeys.ToListAsync();
            foreach (var key in existingKeys)
            {
                key.IsActive = false;
            }

            // Store the new key as active
            var jwtKey = new JwtKey
            {
                KeyValue = newKey,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
            };

            _context.JwtKeys.Add(jwtKey);
            await _context.SaveChangesAsync();
        }
    }
}
