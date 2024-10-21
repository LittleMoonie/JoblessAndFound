// API/Controllers/Authentification/AuthenticationController.cs

using System.Threading.Tasks;
using Core.Entities.Enum;
using Infrastructure.DTO.Authentication;
using Infrastructure.DTO.User;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Authentification
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        // Login endpoint
        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(typeof(LoginResponseDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var loginResponse = await _authenticationService.Login(model);

            if (loginResponse == null)
                return Unauthorized(new { message = "Invalid credentials." });

            // Set the JWT token in a secure HTTP-only cookie
            Response.Cookies.Append(
                "Authorization",
                loginResponse.Token, // This is your JWT token
                new CookieOptions
                {
                    HttpOnly = true, // Prevents JavaScript access to the cookie (XSS protection)
                    Secure = true, // Ensures the cookie is only sent over HTTPS
                    SameSite = SameSiteMode.None, // Required for cross-origin requests
                    Expires = DateTimeOffset.UtcNow.AddHours(1), // Set expiration for the cookie
                }
            );

            return Ok(new { message = "Logged in successfully." });
        }

        // Logout endpoint
        [Authorize]
        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Logout()
        {
            _authenticationService.Logout(); // Call the service to handle logout
            return Ok(new { message = "Logout successful." });
        }

        // Status endpoint
        [Authorize]
        [HttpGet("status")]
        public async Task<AuthenticationResponseDTO> Status()
        {
            try
            {
                Console.WriteLine("Status endpoint hit");
                var statusResponse = await _authenticationService.GetUserStatusResponse();

                if (statusResponse == null)
                {
                    Console.WriteLine("No status response");
                    return new AuthenticationResponseDTO
                    {
                        IsAuthenticated = false,
                        Message = "No status response from service.",
                    };
                }

                return statusResponse;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.Message);
                return new AuthenticationResponseDTO
                {
                    IsAuthenticated = false,
                    Message = "An error occurred while processing the request.",
                };
            }
        }
    }
}
