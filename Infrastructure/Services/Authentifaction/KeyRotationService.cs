using System.Threading;
using System.Threading.Tasks;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Infrastructure.Services.Authentifaction
{
    public class KeyRotationService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public KeyRotationService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                // Example log output in KeyRotationService
                using (var scope = _scopeFactory.CreateScope())
                {
                    var authService =
                        scope.ServiceProvider.GetRequiredService<IAuthenticationService>();
                    // Log which service is being resolved
                    Console.WriteLine("Resolved IAuthenticationService");
                    await authService.GenerateAndStoreNewJwtKey(); // Rotate key
                }

                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}
