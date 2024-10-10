using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Core.Exceptions;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Utility
{
    public static class GetUserInfo
    {
        // Static field to hold the IHttpContextAccessor instance
        private static IHttpContextAccessor _httpContextAccessor;

        // Property to set the IHttpContextAccessor instance (called in Startup.cs)
        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        // Property to get the current UserId from the JWT stored in the cookie
        public static int UserId
        {
            get
            {
                var httpContext = _httpContextAccessor?.HttpContext;

                try
                {
                    // The name of the cookie storing the JWT token
                    var authCookieName = "Authorization";
                    var token = httpContext.Request.Cookies[authCookieName];
                    // Decode the JWT token and extract the user ID
                    var handler = new JwtSecurityTokenHandler();
                    var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
                    // Extract user ID from the "sub" claim (subject)
                    return int.Parse(jsonToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value);
                }
                catch (System.Exception)
                {
                    return 0;
                }
            }
        }
    }
}
