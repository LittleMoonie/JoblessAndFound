using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

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

            context.Response.Body = originalBodyStream;

            responseBody.Seek(0, SeekOrigin.Begin);
            var body = await new StreamReader(responseBody).ReadToEndAsync();

            // Check if the body is not empty, and the response is not an error response
            if (
                !string.IsNullOrEmpty(body)
                && context.Response.StatusCode == StatusCodes.Status200OK
            )
            {
                var wrappedBody = JsonConvert.SerializeObject(
                    new { result = JsonConvert.DeserializeObject(body) }
                );
                await context.Response.WriteAsync(wrappedBody);
            }
            else
            {
                await context.Response.WriteAsync(body);
            }
        }
    }
}
