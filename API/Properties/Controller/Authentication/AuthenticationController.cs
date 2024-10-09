// API/Controllers/Authentification/AuthenticationController.cs
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

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            var token = await _authenticationService.AuthenticateUser(
                request.Email,
                request.Password
            );
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { Message = "Invalid login credentials" });
            }

            return Ok(new { Token = token });
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Invalidate the JWT token by removing it from the client
            Response.Cookies.Delete("Authorization");
            return Ok(new { Message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("status")]
        public async Task<IActionResult> Status()
        {
            var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(
                    new { Message = "Email claim is missing or invalid in the token" }
                );
            }

            var user = await _authenticationService.GetUserStatus(email);
            return user != null ? Ok(user) : NotFound(new { Message = "User not found" });
        }
    }
}
