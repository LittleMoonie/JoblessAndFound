// Extensions/ServiceExtensions.cs

using System.Text;
using AspNetCoreRateLimit;
using Core.Repository;
using DotNetEnv;
using Infrastructure.Data;
using Infrastructure.Mapping;
using Infrastructure.Repository;
using Infrastructure.Services.Authentifaction;
using Infrastructure.Utility;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddCustomServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            // Register application services
            services.AddApplicationServices();

            // Load environment variables from .env file
            Env.Load();

            var dbUser = Environment.GetEnvironmentVariable("DB_USER");
            var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

            // Check if the environment variables are null
            if (string.IsNullOrEmpty(dbUser) || string.IsNullOrEmpty(dbPassword))
            {
                throw new InvalidOperationException(
                    "Database user or password is not set in environment variables."
                );
            }

            // Configure DbContext
            services.AddDbContext<DataContext>(options =>
                options
                    .UseLazyLoadingProxies()
                    .UseMySql(
                        configuration
                            .GetConnectionString("DefaultConnection")
                            .Replace("${DB_USER}", dbUser)
                            .Replace("${DB_PASSWORD}", dbPassword),
                        new MySqlServerVersion(new Version(8, 0, 21))
                    )
            );

            // Register the GenerateSecureKey service
            services.AddScoped<GenerateSecureKey>();

            // Register generic repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Register IHttpContextAccessor for Authentication
            services.AddHttpContextAccessor();

            // Register KeyRotationService as a singleton
            services.AddSingleton<KeyRotationService>();

            // Register MemoryCacheIpPolicyStore
            services.AddMemoryCache();
            services.AddInMemoryRateLimiting();
            services.AddMvc();

            // Register AutoMapper
            services.AddAutoMapper(typeof(MappingProfile));
        }

        public static void AddCustomCors(
            this IServiceCollection services,
            string policyName,
            string frontendUrl
        )
        {
            services.AddCors(options =>
            {
                options.AddPolicy(
                    policyName,
                    builder =>
                    {
                        builder
                            .WithOrigins(frontendUrl) // Specify allowed origin
                            .WithMethods("GET", "POST") // Only allow necessary methods
                            .WithHeaders("Content-Type", "Authorization") // Limit to necessary headers
                            .AllowCredentials(); // Allow credentials
                    }
                );
            });
        }

        public static void AddCustomSession(this IServiceCollection services)
        {
            // Add session support
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
                options.Cookie.SameSite = SameSiteMode.None; // Allow cross-origin cookies
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Set to Always to meet SameSite=None requirements
                options.IdleTimeout = TimeSpan.FromMinutes(30);
            });
        }

        public static void AddCustomAuthentication(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            // Load environment variables from .env file
            Env.Load();

            // Get environment variables
            var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
            var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
            var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                    };
                });
        }
    }
}
