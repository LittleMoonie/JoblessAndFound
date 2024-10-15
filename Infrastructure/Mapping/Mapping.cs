using System;
using System.Linq;
using System.Reflection;
using AutoMapper;
using Core.Mapping;
using Infrastructure.DTO.Offer; // Assurez-vous d'inclure l'espace de noms pour votre DTO
using Core.Entities.Offer; // Assurez-vous d'inclure l'espace de noms pour votre entité

namespace Infrastructure.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Définition du mappage entre Advertisement et OfferAdvertisementDTO
            CreateMap<Advertisement, OfferAdvertisementDTO>();

            // Scan assemblies for IMap implementations and apply their mappings
            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var types = assembly
                .GetExportedTypes()
                .Where(t => typeof(IMap).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type) as IMap;
                instance?.Mapping(this);
            }
        }
    }
}
