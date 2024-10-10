// Infrastructure/Services/IServices/Authentification/IJwtService.cs
using Core.Entities.User;

namespace Infrastructure.Services.IServices.Authentification
{
    public interface IJwtService
    {
        string GenerateToken(User user);
        Task<string> GetActiveKeyAsync();
    }
}
