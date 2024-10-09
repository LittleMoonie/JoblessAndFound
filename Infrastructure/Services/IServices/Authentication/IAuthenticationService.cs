using System.Threading.Tasks;
using Core.Entities.User;
using Infrastructure.DTO.User;

namespace Infrastructure.Services.IServices.Authentification
{
    public interface IAuthenticationService
    {
        Task<string> AuthenticateUser(string email, string password);
        Task<bool> Logout();
        Task<UserDTO> GetUserStatus(string email);
        Task<User> GetUserByEmail(string email);
        Task<string> GenerateAndStoreNewJwtKey();
    }
}
