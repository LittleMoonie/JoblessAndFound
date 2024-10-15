using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Mapping;

namespace Infrastructure.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Scan assemblies for IMap implementations and apply their mappings
            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var types = assembly
                .GetExportedTypes()
                .Where(t => typeof(IMap).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
                .ToList();

            Console.WriteLine($"Applying mappings from assembly: {assembly.FullName}");
            Console.WriteLine($"Number of types found: {types.Count}");

            foreach (var type in types)
            {
                Console.WriteLine($"Mapping type detected: {type.FullName}");

                var instance = Activator.CreateInstance(type) as IMap;
                instance?.Mapping(this);
            }
        }
    }
}
