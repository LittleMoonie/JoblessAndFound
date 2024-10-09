using Infrastructure.DTO.Authentication;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authenticationService.Logout();
            return Ok(new { Message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("status")]
        public async Task<IActionResult> Status()
        {
            var user = await _authenticationService.GetUserStatus(User.Identity.Name);
            return user != null ? Ok(user) : NotFound(new { Message = "User not found" });
        }
    }
}
