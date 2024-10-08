using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.DTO.User;

namespace Infrastructure.Services.IServices.Authentification
{
    public interface IAuthenticationService
    {
        Task<UserDTO> AuthenticateUserAsync(string email, string password);
        Task<bool> LogoutAsync();
        Task<UserDTO> GetUserStatusAsync(string email);
    }
}
