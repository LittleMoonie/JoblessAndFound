using System;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services.Authentifaction
{
    public class JwtBearerEventsService : JwtBearerEvents
    {
        private readonly IJwtService _jwtKeyService;
        private readonly ILogger<JwtBearerEventsService> _logger;

        public JwtBearerEventsService(
            IJwtService jwtKeyService,
            ILogger<JwtBearerEventsService> logger
        )
        {
            _jwtKeyService = jwtKeyService;
            _logger = logger;
        }

        public override async Task TokenValidated(TokenValidatedContext context)
        {
            try
            {
                var jwtKey = await _jwtKeyService.GetActiveKeyAsync();
                if (string.IsNullOrEmpty(jwtKey))
                {
                    _logger.LogWarning("No active JWT key found.");
                    context.Fail("No active JWT key found.");
                    return;
                }

                // Optionally, perform additional validations here
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during token validation.");
                context.Fail("Token validation failed.");
            }
        }

        public override Task AuthenticationFailed(AuthenticationFailedContext context)
        {
            _logger.LogError(context.Exception, "Authentication failed.");
            return Task.CompletedTask;
        }
    }
}
