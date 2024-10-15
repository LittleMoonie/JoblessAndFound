// API/Middleware/SwaggerAccessMiddleware.cs

using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class SwaggerAccessMiddleware
    {
        private readonly RequestDelegate _next;

        public SwaggerAccessMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Check if the request is targeting the Swagger UI
            if (
                context.Request.Path.StartsWithSegments("/swagger")
                && !context.User.Identity.IsAuthenticated
            )
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync(
                    "You need to be authenticated to access Swagger."
                );
                return;
            }

            await _next(context);
        }
    }
}
