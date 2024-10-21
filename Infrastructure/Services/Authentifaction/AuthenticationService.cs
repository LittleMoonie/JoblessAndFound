// Infrastructure/Services/Authentifaction/AuthenticationService.cs

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities.User;
using Core.Repository;
using Infrastructure.DTO.Authentication;
using Infrastructure.DTO.User;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services.Authentifaction
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtService _jwtService; // Service to handle JWT token operations
        private readonly IRepository<User> _userRepository; // Repository for accessing user data
        private readonly IHttpContextAccessor _httpContextAccessor; // Accessor for HTTP context (used for claims)
        private readonly ILogger<AuthenticationService> _logger; // Logger for logging information and errors
        private readonly IMapper _mapper; // AutoMapper to map between entity and DTO

        public AuthenticationService(
            IJwtService jwtService,
            IRepository<User> userRepository,
            IHttpContextAccessor httpContextAccessor,
            ILogger<AuthenticationService> logger,
            IMapper mapper
        )
        {
            _jwtService = jwtService;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _mapper = mapper;
        }

        // 1. LOGIN LOGIC
        public async Task<LoginResponseDTO> Login(LoginRequestDTO model)
        {
            try
            {
                _logger.LogInformation($"Attempting to authenticate user: {model.Email}");

                // Retrieve the user from the database using the email
                var user = await _userRepository.FindAsync(u => u.Email == model.Email);

                // Check if user was found
                if (user == null)
                {
                    _logger.LogWarning($"No user found for email: {model.Email}");
                    throw new AuthenticationException("Invalid email or password.");
                }

                // Log the found user data for debugging purposes
                _logger.LogInformation($"User found: {user.Email}, Hash: {user.PasswordHash}");

                // Verify if the password is correct
                if (!BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                {
                    _logger.LogWarning($"Password verification failed for email: {model.Email}");
                    throw new AuthenticationException("Invalid email or password.");
                }

                _logger.LogInformation($"Generating JWT token for user: {user.Email}");

                // Generate a JWT token for the authenticated user
                var token = _jwtService.GenerateToken(user);

                // Log the login action
                _logger.LogInformation($"User logged in successfully: {user.Email}");

                // Return the token and a success message
                return new LoginResponseDTO { Token = token, Message = "Logged in successfully." };
            }
            catch (AuthenticationException authEx)
            {
                _logger.LogWarning(
                    $"Authentication failed for email: {model.Email}. Reason: {authEx.Message}"
                );
                throw; // Re-throw the specific AuthenticationException to handle in the calling function
            }
            catch (Exception ex)
            {
                // Log any unexpected errors
                _logger.LogError(
                    $"An unexpected error occurred during login for email {model.Email}: {ex.Message}. Stack Trace: {ex.StackTrace}"
                );
                throw new AuthenticationException("An error occurred during login.");
            }
        }

        // 2. LOGOUT LOGIC
        public void Logout()
        {
            var context = _httpContextAccessor.HttpContext;

            if (context != null)
            {
                var cookies = context.Response.Cookies;

                _logger.LogInformation("Attempting to delete the Authorization cookie.");

                // Ensure the correct cookie is deleted with matching attributes
                cookies.Delete(
                    "Authorization",
                    new CookieOptions
                    {
                        Path = "/", // Match the path used when the cookie was created
                        HttpOnly = true, // Match HttpOnly
                        Secure = true, // Match Secure (only available over HTTPS)
                        SameSite =
                            SameSiteMode.None // Match SameSite=None
                        ,
                    }
                );

                _logger.LogInformation("Authorization cookie deletion attempt completed.");
            }
            else
            {
                _logger.LogWarning("No HttpContext found while trying to log out.");
            }
        }

        // 3. STATUS LOGIC
        public async Task<AuthenticationResponseDTO> GetUserStatusResponse()
        {
            var context = _httpContextAccessor.HttpContext;

            if (context == null || context.User == null)
            {
                return new AuthenticationResponseDTO
                {
                    IsAuthenticated = false,
                    Message = "No user context found.",
                };
            }

            var userIdClaim = context
                .User.FindFirst(
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                )
                ?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return new AuthenticationResponseDTO
                {
                    IsAuthenticated = false,
                    Message = "User ID claim not found.",
                };
            }

            if (!int.TryParse(userIdClaim, out var userId))
            {
                return new AuthenticationResponseDTO
                {
                    IsAuthenticated = false,
                    Message = "Invalid user ID.",
                };
            }

            var user = await _userRepository.FindByIdAsync(userId);

            if (user == null)
            {
                return new AuthenticationResponseDTO
                {
                    IsAuthenticated = false,
                    Message = "User not found.",
                };
            }

            var userDto = _mapper.Map<UserDTO>(user);

            return new AuthenticationResponseDTO
            {
                IsAuthenticated = true,
                User = userDto, // Manually set UserDTO
                Message = "User is authenticated.",
            };
        }
    }
}
