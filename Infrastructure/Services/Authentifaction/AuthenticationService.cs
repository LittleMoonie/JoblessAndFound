using System.Security.Claims;
using Core.Entities.Enum;
using Core.Entities.User;
using Core.Repository;
using Infrastructure.DTO.User;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Authentication;
using AuthenticationProperties = Microsoft.AspNetCore.Authentication.AuthenticationProperties;
using IAuthenticationService = Infrastructure.Services.IServices.Authentification.IAuthenticationService;

namespace Infrastructure.Services.Authentifaction
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthenticationService(
            IRepository<User> userRepository,
            IHttpContextAccessor httpContextAccessor
        )
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<UserDTO> AuthenticateUserAsync(string email, string password)
        {
            // Find user based on email and password
            var user = await _userRepository.FindAsync(u =>
                u.Email == email && u.PasswordHash == password
            );

            if (user == null)
                return null;

            // Map user entity to UserDTO
            var userDto = new UserDTO
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserType = (UserTypeEnum)
                    user.UserTypeId // Map UserTypeId to UserTypeEnum
                ,
            };

            // Create claims for the user, including role
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userDto.Email),
                new Claim(
                    ClaimTypes.Role,
                    userDto.UserType.ToString()
                ) // Set role based on UserTypeEnum
                ,
            };

            // Create ClaimsIdentity and sign in the user
            var claimsIdentity = new ClaimsIdentity(
                claims,
                CookieAuthenticationDefaults.AuthenticationScheme
            );
            await _httpContextAccessor.HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                new AuthenticationProperties { IsPersistent = true }
            );

            return userDto;
        }

        public async Task<bool> LogoutAsync()
        {
            // Sign out the user by removing the authentication cookie
            await _httpContextAccessor.HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme
            );
            return true;
        }

        public async Task<UserDTO> GetUserStatusAsync(string email)
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
                UserType = (UserTypeEnum)
                    user.UserTypeId // Map UserTypeId to UserTypeEnum
                ,
            };
        }
    }
}
