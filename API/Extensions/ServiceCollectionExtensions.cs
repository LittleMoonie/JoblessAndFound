using System;
using System.Linq;
using System.Reflection;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace API
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register services automatically, excluding IHostedService implementations
            RegisterAllServices(services);

            return services;
        }

        private static void RegisterAllServices(IServiceCollection services)
        {
            var assembly = Assembly.GetAssembly(typeof(UserService));

            if (assembly == null)
            {
                throw new InvalidOperationException(
                    "Unable to find the assembly containing the services."
                );
            }

            var typesWithInterfaces = assembly
                .GetTypes()
                .Where(t =>
                    t.IsClass
                    && !t.IsAbstract
                    && t.GetInterfaces().Any()
                    && t.Namespace != null
                    && t.Namespace.StartsWith("Infrastructure.Services")
                    && !typeof(IHostedService).IsAssignableFrom(t) // Exclude IHostedService implementations
                )
                .ToList();

            foreach (var implementationType in typesWithInterfaces)
            {
                Console.WriteLine($"Registering service: {implementationType.Name}");
                foreach (var interfaceType in implementationType.GetInterfaces())
                {
                    Console.WriteLine($"    Interface: {interfaceType.Name}");
                    // Register as scoped by default
                    services.AddScoped(interfaceType, implementationType);
                }
            }
        }
    }
}
