using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BCrypt.Net; // Make sure to install the BCrypt.Net-Next NuGet package
using Core.Entities.Enum;
using Core.Entities.User;
using Core.Exceptions;
using Core.Repository;
using Infrastructure.DTO.User;
using Infrastructure.Services.IServices;
using Infrastructure.Utility;
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

        public async Task<UserDTO> GetCurrentUser(int UserId)
        {
            var user = await userRepository.FindByIdAsync(UserId);
            if (user == null)
                throw new NotFoundException($"User with ID {UserId} not found.");
            return mapper.Map<UserDTO>(user);
        }

        public async Task AddUser(
            string firstName,
            string lastName,
            string email,
            string password,
            string phoneNumber,
            string countryCode,
            int userTypeId // New parameter for UserTypeId
        )
        {
            // Create an instance of the phone number verifier
            var phoneNumberVerifier = new PhoneNumberVerifier();

            // Check if a user with the given email already exists in the repository
            var existingUser = await userRepository.FindAsync(u => u.Email == email);
            if (existingUser != null)
            {
                // If the user already exists, throw an exception
                throw new InvalidOperationException("User with this email already exists.");
            }

            // Validate the phone number
            if (!phoneNumberVerifier.IsPhoneNumberValid(phoneNumber, countryCode))
            {
                throw new ArgumentException(
                    "The provided phone number is not valid for the given country code."
                );
            }

            // Validate the UserTypeId against valid enum values
            if (!Enum.IsDefined(typeof(UserTypeEnum), userTypeId))
            {
                throw new ArgumentException("Invalid UserTypeId provided.");
            }

            // Hash the password using BCrypt
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            // Format the phone number to the international format
            string formattedPhoneNumber = phoneNumberVerifier.FormatPhoneNumber(
                phoneNumber,
                countryCode
            );

            // Create a new user object with the given details
            var newUser = new User
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                PasswordHash = passwordHash,
                PhoneNumber = formattedPhoneNumber,
                UserTypeId =
                    userTypeId // Include the UserTypeId
                ,
            };

            // Add the new user to the repository
            await userRepository.AddAsync(newUser);
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
