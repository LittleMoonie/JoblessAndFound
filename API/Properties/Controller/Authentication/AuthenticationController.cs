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
            // Fetch the user from the database using the email
            var user = await _authenticationService.GetUserByEmail(request.Email); // Implement this method

            // Check if user exists
            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // Compare the hashed password in the database with the incoming password
            var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

            if (!isPasswordValid)
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // If valid, return success response
            return Ok(new { Message = "Login successful", User = user });
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
