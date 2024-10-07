using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BCrypt.Net; // Make sure to install the BCrypt.Net-Next NuGet package
using Core.Entities.User;
using Core.Exceptions;
using Core.Repository;
using Infrastructure.DTO.User;
using Infrastructure.Services.IServices;
using Org.BouncyCastle.Crypto.Generators;

namespace Infrastructure.Services
{
    public class UserService(IRepository<User> userRepository, IMapper mapper) : IUserService
    {
        public async Task<UserDTO> GetUserById(int UserId)
        {
            var user = await userRepository.FindByIdAsync(UserId);
            if (user == null)
                throw new NotFoundException($"User with ID {UserId} not found.");
            return mapper.Map<UserDTO>(user);
        }

        public async Task AddUser(string firstName, string lastName, string email, string password)
        {
            // Query the user repository for a user with the given email
            var users = await userRepository.GetAllAsync();
            var user = users.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                // Hash the password using BCrypt
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

                var newUser = new User()
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    Password = passwordHash,
                };

                await userRepository.AddAsync(newUser);
            }
            else
            {
                // User already exists, handle accordingly
                throw new Exception("User with this email already exists.");
            }
        }

        public async Task<UserDTO> VerifyLogin(string email, string password)
        {
            var user = await userRepository.FindAsync<UserDTO>(u => u.Email == email);

            if (user == null)
            {
                // User does not exist
                return null;
            }

            // Verify the password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.Password);
            if (isPasswordValid)
            {
                // Password is correct
                return user;
            }
            else
            {
                // Password is incorrect
                return null;
            }
        }
    }
}
