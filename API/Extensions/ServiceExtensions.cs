// API/Extensions/ServiceExtensions.cs
using System;
using AspNetCoreRateLimit;
using Core.Repository;
using DotNetEnv;
using Infrastructure.Data;
using Infrastructure.Mapping;
using Infrastructure.Repository;
using Infrastructure.Services.Authentifaction;
using Infrastructure.Services.IServices.Authentification;
using Infrastructure.Utility;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

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

            // Register JWT Service
            services.AddScoped<IJwtService, JwtService>(); // Ensure JwtService is implemented
        }

        public static void AddCustomCors(
            this IServiceCollection services,
            string policyName,
            params string[] allowedOrigins
        )
        {
            services.AddCors(options =>
            {
                options.AddPolicy(
                    policyName,
                    builder =>
                    {
                        builder
                            .WithOrigins(allowedOrigins)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
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
    }
}
