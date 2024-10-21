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
using Infrastructure.Repository;
using Infrastructure.Services.IServices;
using Infrastructure.Utility;
using Org.BouncyCastle.Crypto.Generators;

namespace Infrastructure.Services
{
    public class UserService(IRepository<User> userRepository, IMapper mapper) : IUserService
    {
        public async Task<PaginatedResult<UserDTO>> GetAllUsers(
            string searchTerm = "",
            int page = 1,
            int pageSize = 10
        )
        {
            // Fetch all users from the repository
            var users = await userRepository.GetAllAsync();

            // Apply search filter if searchTerm is provided
            if (!string.IsNullOrEmpty(searchTerm))
            {
                users = users.Where(u =>
                    u.FirstName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)
                    || u.LastName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)
                    || u.Email.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)
                );
            }

            // Calculate total user count before pagination
            int totalCount = users.Count();

            // Apply pagination
            var paginatedUsers = users.Skip((page - 1) * pageSize).Take(pageSize);

            // Map to UserDTO
            var paginatedUserDtos = mapper.Map<IEnumerable<UserDTO>>(paginatedUsers);

            // Return the paginated result and total count
            return new PaginatedResult<UserDTO>
            {
                Data = paginatedUserDtos,
                TotalCount = totalCount,
            };
        }

        public async Task<UserDTO> GetUserById(int UserId)
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
            int userTypeId
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

        public async Task UpdateUser(
            int userId,
            string firstName,
            string lastName,
            string email,
            string phoneNumber,
            int userTypeId
        )
        {
            // Retrieve the user by ID
            var existingUser = await userRepository.FindAsync(u => u.Id == userId);
            if (existingUser == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            // Check if email is being changed and is already in use by another user
            if (existingUser.Email != email)
            {
                var emailInUse = await userRepository.FindAsync(u => u.Email == email);
                if (emailInUse != null)
                {
                    throw new InvalidOperationException("Email is already in use.");
                }
            }

            // Update the user's properties
            existingUser.FirstName = firstName;
            existingUser.LastName = lastName;
            existingUser.Email = email;
            existingUser.PhoneNumber = phoneNumber;
            existingUser.UserTypeId = userTypeId;

            // Save the changes in the repository
            await userRepository.UpdateAsync(existingUser);
        }

        public async Task DeleteUser(int userId)
        {
            var user = await userRepository.FindByIdAsync(userId);
            if (user == null)
                throw new NotFoundException($"User with ID {userId} not found.");

            await userRepository.DeleteAsync(userId);
        }
    }
}
