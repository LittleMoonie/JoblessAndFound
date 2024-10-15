using System.Security.Claims;
using Core.Entities.User;
using Infrastructure.DTO.Authentication;
using Infrastructure.DTO.User;
using Microsoft.AspNetCore.Mvc;

namespace Infrastructure.Services.IServices.Authentification
{
    public interface IAuthenticationService
    {
        Task<LoginResponseDTO> Login(LoginRequestDTO model);
        void Logout();
        Task<AuthenticationResponseDTO> GetUserStatusResponse();
    }
}
