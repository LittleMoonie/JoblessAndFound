// Extensions/ServiceExtensions.cs

using Core.Repository;
using Infrastructure.Data;
using Infrastructure.Mapping;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

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

            // Configure DbContext
            services.AddDbContext<DataContext>(options =>
                options
                    .UseLazyLoadingProxies()
                    .UseMySql(
                        configuration.GetConnectionString("DefaultConnection"),
                        new MySqlServerVersion(new Version(8, 0, 21))
                    )
            );

            // Register generic repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

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
                            .WithOrigins(frontendUrl)
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
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

        public static void AddCustomAuthentication(this IServiceCollection services)
        {
            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Cookie.SameSite = SameSiteMode.None;
                    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                    options.Cookie.HttpOnly = true; // Ensures cookie cannot be accessed via JavaScript
                });
        }
    }
}
