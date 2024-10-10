using System.Security.Claims;
using Core.Entities.User;
using Infrastructure.DTO.Authentication;
using Infrastructure.DTO.User;

namespace Infrastructure.Services.IServices.Authentification
{
    public interface IAuthenticationService
    {
        Task<LoginResponseDTO> Login(string email, string password);
        Task<bool> Logout();
        Task<UserDTO> Status(string email);
        Task<User> GetUserByEmail(string email);
        Task<bool> IsAuthenticatedAsync(ClaimsPrincipal user);
    }
}
