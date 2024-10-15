// API/Controllers/SecureController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Requires authorization for all endpoints in this controller
    public class AdminController : ControllerBase
    {
        [HttpGet("admin-endpoint")]
        public IActionResult AdminEndpoint()
        {
            return Ok("Only authorized users can access this endpoint.");
        }

        [HttpGet("user-endpoint")]
        [Authorize(Policy = "UserPolicy")] // Example: Require specific user role or policy
        public IActionResult UserEndpoint()
        {
            return Ok("Only users with a specific policy can access this endpoint.");
        }
    }
}
