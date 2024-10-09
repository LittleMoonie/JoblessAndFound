using System;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Core.Entities.Authentication;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Utility
{
    public class GenerateSecureKey
    {
        private readonly DataContext _context;

        public GenerateSecureKey(DataContext context)
        {
            _context = context;
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

        // Method to store a new key
        public async Task StoreNewKeyAsync()
        {
            var newKeyValue = CreateSecureKey(); // Generate a new key
            var newKey = new JwtKey
            {
                KeyValue = newKeyValue,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
            };

            try
            {
                // Store the new key in the database
                await _context.JwtKeys.AddAsync(newKey);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Handle exceptions (e.g., logging)
                Console.WriteLine($"Error storing JWT key: {ex.Message}");
                throw; // Rethrow or handle accordingly
            }
        }

        // Method to get the active key
        public async Task<string> GetActiveKeyAsync()
        {
            try
            {
                var activeKey = await _context
                    .JwtKeys.Where(k => k.IsActive)
                    .OrderByDescending(k => k.CreatedAt)
                    .FirstOrDefaultAsync();

                return activeKey?.KeyValue; // Return the active key value
            }
            catch (Exception ex)
            {
                // Handle exceptions (e.g., logging)
                Console.WriteLine($"Error retrieving active JWT key: {ex.Message}");
                throw; // Rethrow or handle accordingly
            }
        }

        // Method to rotate the key
        public async Task RotateKeyAsync()
        {
            try
            {
                // Mark all existing keys as inactive
                var existingKeys = await _context.JwtKeys.ToListAsync();
                foreach (var key in existingKeys)
                {
                    key.IsActive = false;
                }

                // Store the new key
                await StoreNewKeyAsync();
            }
            catch (Exception ex)
            {
                // Handle exceptions (e.g., logging)
                Console.WriteLine($"Error rotating JWT keys: {ex.Message}");
                throw; // Rethrow or handle accordingly
            }
        }
    }
}
