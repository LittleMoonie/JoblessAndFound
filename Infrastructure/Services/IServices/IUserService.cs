using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.User;
using Infrastructure.DTO.User;

namespace Infrastructure.Services.IServices
{
    public interface IUserService
    {
        Task<UserDTO> GetUserById(int UserId);
        Task<UserDTO> VerifyLogin(string email, string password);
        Task AddUser(string FirstName, string LastName, string Email, string Password);
    }
}
