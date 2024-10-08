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
        public async Task<UserDTO> GetUserById(int userId)
        {
            return await _UserService.GetUserById(userId);
        }

        [HttpGet("VerifyLogin")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<UserDTO> VerifyLogin(string email, string password)
        {
            return await _UserService.VerifyLogin(email, password);
        }

        #endregion

        #region POST
        [HttpPost("AddUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task AddUser(
            string firstName,
            string lastName,
            string email,
            string password,
            string phoneNumber,
            string countryCode
        )
        {
            await _UserService.AddUser(
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                countryCode
            );
        }
        #endregion
    }
}
