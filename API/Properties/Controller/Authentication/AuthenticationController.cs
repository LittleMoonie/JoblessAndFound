// API/Controllers/Authentification/AuthenticationController.cs
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;
using Infrastructure.DTO.Authentication;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Authentification
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(
            IAuthenticationService authenticationService,
            ILogger<AuthenticationController> logger
        )
        {
            _authenticationService = authenticationService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var loginResponse = await _authenticationService.Login(model.Email, model.Password);
                // Set the JWT token in a secure HTTP-only cookie
                Response.Cookies.Append(
                    "Authorization",
                    loginResponse.Token,
                    new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.Strict,
                        Expires = DateTimeOffset.UtcNow.AddHours(1),
                    }
                );

                // Return only the success message
                return Ok(new { message = loginResponse.Message });
            }
            catch (AuthenticationException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during login.");
                return StatusCode(500, new { message = "An internal server error occurred." });
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Remove the JWT token from the cookie
            Response.Cookies.Delete("Authorization");
            return Ok(new { message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("status")]
        public async Task<IActionResult> Status()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized(
                    new { message = "Email claim is missing or invalid in the token" }
                );
            }

            var user = await _authenticationService.Status(email);
            return user != null ? Ok(user) : NotFound(new { message = "User not found" });
        }
    }
}
