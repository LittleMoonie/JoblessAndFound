using AutoMapper;
using Core.Mapping;

namespace Infrastructure.DTO.Company
{
    public class CompanyDTO : IMap
    {
        public int CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string? Location { get; set; } 
        public string? Domain { get; set; }
        public int EmployeesId { get; set; }
        public List<OfferAdvertisementDTO>? OfferAdvertisement { get; set; }


        public void Mapping(Profile profile)
        {
            profile
                .CreateMap<Core.Entities.Company, CompanyDTO>()
                .ForMember(dest => dest.CompanyId, opt => opt.MapFrom(src => src.Id))
                .ReverseMap();

            //profile
            //    .CreateMap<Core.Entities.Offer.Advertisement, CompanyDTO>()
            //    .ForMember(dest => dest.CompanyId, opt => opt.MapFrom(src => src.Id))
            //    .ReverseMap();
        }
    }

    public class CompanyWithOffersDTO
    {
        public CompanyDTO? Company { get; set; }
        public List<OfferAdvertisementDTO>? Offers { get; set; }
    }
}
