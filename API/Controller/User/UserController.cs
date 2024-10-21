using AutoMapper;
using Infrastructure.DTO.User;
using Infrastructure.Repository;
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
        [HttpGet("GetAllUsers")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        public async Task<PaginatedResult<UserDTO>> GetAllUsers(
            string searchTerm = "",
            int page = 1,
            int pageSize = 10
        )
        {
            return await _UserService.GetAllUsers(searchTerm, page, pageSize);
        }

        [HttpGet("GetUserById")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        public async Task<UserDTO> GetUserById(int userId)
        {
            return await _UserService.GetUserById(userId);
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
            string countryCode,
            int userTypeId
        )
        {
            await _UserService.AddUser(
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                countryCode,
                userTypeId
            );
        }

        [HttpPost("UpdateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task UpdateUser(
            int userId,
            string firstName,
            string lastName,
            string email,
            string phoneNumber,
            int userTypeId
        )
        {
            await _UserService.UpdateUser(
                userId,
                firstName,
                lastName,
                email,
                phoneNumber,
                userTypeId
            );
        }

        [HttpPost("DeleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task DeleteUser(int userId)
        {
            await _UserService.DeleteUser(userId);
        }
        #endregion
    }
}
