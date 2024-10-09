using Core.Entities.User;

namespace Infrastructure.Services.IServices.Authentification
{
    public interface IJwtService
    {
        string GenerateJwtToken(User user);
        Task<string> GetActiveKeyAsync();
        Task GenerateAndStoreNewJwtKeyAsync();
    }
}
