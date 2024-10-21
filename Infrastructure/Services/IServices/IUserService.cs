using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.User;
using Infrastructure.DTO.User;
using Infrastructure.Repository;

namespace Infrastructure.Services.IServices
{
    public interface IUserService
    {
        Task<PaginatedResult<UserDTO>> GetAllUsers(
            string searchTerm = "",
            int page = 1,
            int pageSize = 10
        );
        Task<UserDTO> GetUserById(int UserId);
        Task AddUser(
            string firstName,
            string lastName,
            string email,
            string password,
            string phoneNumber,
            string countryCode,
            int userTypeId
        );

        Task UpdateUser(
            int userId,
            string firstName,
            string lastName,
            string email,
            string phoneNumber,
            int userTypeId
        );

        Task DeleteUser(int userId);
    }
}
