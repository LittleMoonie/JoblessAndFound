// Middleware/ApiResponseMiddleware.cs
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace API.Middleware
{
    public class ApiResponseMiddleware
    {
        private readonly RequestDelegate _next;

        public ApiResponseMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var originalBodyStream = context.Response.Body;

            using (var responseBody = new MemoryStream())
            {
                context.Response.Body = responseBody;

                await _next(context);

                context.Response.Body.Seek(0, SeekOrigin.Begin);
                var text = await new StreamReader(context.Response.Body).ReadToEndAsync();
                context.Response.Body.Seek(0, SeekOrigin.Begin);

                if (!string.IsNullOrWhiteSpace(text))
                {
                    // Optionally, wrap responses in a standard format
                    var responseObj = JsonConvert.DeserializeObject<object>(text);
                    var wrappedResponse = new { result = responseObj };
                    var wrappedResponseText = JsonConvert.SerializeObject(wrappedResponse);
                    await context.Response.WriteAsync(wrappedResponseText);
                }
                else
                {
                    await context.Response.Body.CopyToAsync(originalBodyStream);
                }
            }
        }
    }
}
