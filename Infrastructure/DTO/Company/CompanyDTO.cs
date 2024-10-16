using AutoMapper;
using Core.Mapping;
using Infrastructure.DTO.Offer;

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
                .ForMember(
                    dest => dest.OfferAdvertisement,
                    opt =>
                        opt.MapFrom(src =>
                            src.Advertisements.AsQueryable()
                                .Select(o => new OfferAdvertisementDTO
                                {
                                    OfferAdvertisementId = o.Id,
                                    Title = o.Title,
                                    Description = o.Description,
                                    CreatedAt = o.CreatedAt,
                                    UpdatedAt = o.UpdatedAt,
                                    CompanyId = o.CompanyId,
                                    PostedByUserId = o.PostedByUserId,
                                })
                                .ToList()
                        ) // Ensure that ToList() is only called once you're done with the IQueryable transformation
                )
                .ReverseMap();
        }
    }

    public class CompanyWithOffersDTO
    {
        public CompanyDTO? Company { get; set; }
        public List<OfferAdvertisementDTO>? Offers { get; set; }
    }
}
