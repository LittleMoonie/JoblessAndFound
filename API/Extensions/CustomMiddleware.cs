using System.Threading.Tasks;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Http;

namespace API.Middleware
{
    public class CustomMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Resolve the IAuthenticationService from the request's service scope
            var authenticationService =
                context.RequestServices.GetRequiredService<IAuthenticationService>();

            // Check if the user is authenticated
            var isAuthenticated = await authenticationService.IsAuthenticatedAsync(context.User);

            if (!isAuthenticated)
            {
                // If the user is not authenticated, return a 401 Unauthorized response
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }

            // If the user is authenticated, proceed to the next middleware
            await _next(context);
        }
    }
}
