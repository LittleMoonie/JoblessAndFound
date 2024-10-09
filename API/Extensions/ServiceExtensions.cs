using System.Text;
using AspNetCoreRateLimit;
using Core.Repository;
using DotNetEnv;
using Infrastructure.Data;
using Infrastructure.Mapping;
using Infrastructure.Repository;
using Infrastructure.Services.Authentifaction;
using Infrastructure.Services.IServices.Authentification;
using Infrastructure.Utility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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

            // Configure DbContext with environment variables
            Env.Load();
            var dbUser = Environment.GetEnvironmentVariable("DB_USER");
            var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

            if (string.IsNullOrEmpty(dbUser) || string.IsNullOrEmpty(dbPassword))
            {
                throw new InvalidOperationException(
                    "Database user or password is not set in environment variables."
                );
            }

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

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddHttpContextAccessor();
            services.AddMemoryCache();
            services.AddInMemoryRateLimiting();
            services.AddMvc();
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
                    "AllowFrontend",
                    builder =>
                    {
                        builder
                            .WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials(); // Allow credentials like cookies
                    }
                );
            });
        }

        public static void AddCustomSession(this IServiceCollection services)
        {
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.IdleTimeout = TimeSpan.FromMinutes(30);
            });
        }

        public static void AddCustomAuthentication(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            // Load environment variables (if any)
            Env.Load();

            // Get JWT settings from environment variables or configuration
            var jwtKey =
                Environment.GetEnvironmentVariable("JWT_KEY") ?? configuration["JwtSettings:Key"];
            var jwtIssuer =
                Environment.GetEnvironmentVariable("JWT_ISSUER")
                ?? configuration["JwtSettings:Issuer"];
            var jwtAudience =
                Environment.GetEnvironmentVariable("JWT_AUDIENCE")
                ?? configuration["JwtSettings:Audience"];

            // Check if all JWT settings are available
            if (
                string.IsNullOrEmpty(jwtKey)
                || string.IsNullOrEmpty(jwtIssuer)
                || string.IsNullOrEmpty(jwtAudience)
            )
            {
                throw new InvalidOperationException(
                    "JWT settings are not configured correctly in appsettings or environment variables."
                );
            }

            // Configure JWT Bearer Authentication
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["JwtSettings:Issuer"],
                        ValidAudience = configuration["JwtSettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"])
                        ),
                    };
                });
        }
    }
}
