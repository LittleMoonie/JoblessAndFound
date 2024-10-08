using Core.Entities.User;
using Infrastructure.DTO.Authentication;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Properties.Controller.Authentification
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            var user = await _authenticationService.AuthenticateUserAsync(
                request.Email,
                request.Password
            );

            if (user == null)
                return Unauthorized(new { Message = "Invalid email or password" });

            return Ok(new { Message = "Login successful", User = user });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authenticationService.LogoutAsync();
            return Ok(new { Message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("status")]
        public async Task<IActionResult> Status()
        {
            var user = await _authenticationService.GetUserStatusAsync(User.Identity.Name);
            return user != null ? Ok(user) : NotFound(new { Message = "User not found" });
        }
    }
}
