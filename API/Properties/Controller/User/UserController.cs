using AutoMapper;
using Infrastructure.DTO.User;
using Infrastructure.Services;
using Infrastructure.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller.User
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _UserService;
        private readonly IMapper _mapper;

        public UserController(IUserService Userervice, IMapper mapper)
        {
            _UserService = Userervice;
            _mapper = mapper;
        }

        #region GET
        [HttpGet("GetUserById")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        public async Task<UserDTO> GetUserById(int DiscordUserId)
        {
            return await _UserService.GetUserById(DiscordUserId);
        }

        [HttpGet("VerifyLogin")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<UserDTO> VerifyLogin(string Email, string Password)
        {
            return await _UserService.VerifyLogin(Email, Password);
        }

        #endregion

        #region POST
        [HttpPost("AddUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task AddStardustToUserById(
            string FirstName,
            string LastName,
            string Email,
            string Password
        )
        {
            await _UserService.AddUser(FirstName, LastName, Email, Password);
        }
        #endregion
    }
}
