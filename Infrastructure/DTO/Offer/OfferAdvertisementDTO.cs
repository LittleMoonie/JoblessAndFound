using AutoMapper;
using Core.Entities.Offer;
using Core.Mapping;

namespace Infrastructure.DTO.Offer
{
    public class OfferAdvertisementDTO : IMap
    {
        public int OfferAdvertisementId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? LongDescription { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int CompanyId { get; set; }
        public int PostedByUserId { get; set; }

        public void Mapping(Profile profile)
        {
            profile
                .CreateMap<Advertisement, OfferAdvertisementDTO>()
                .ForMember(desc => desc.OfferAdvertisementId, opt => opt.MapFrom(src => src.Id))
                .ReverseMap();
        }
    }
}

//namespace Infrastructure.DTO.OfferAdvertisement
//{
//    public class OfferAdvertisementDTO : IMap
//    {
//        public int OfferAdvertisementId { get; set; }
//        public string? Title { get; set; }
//        public string? Description { get; set; }
//        public DateTime? CreatedAt { get; set; }
//        public DateTime? UpdatedAt { get; set; }

//        #region Foreign Key Mappings
//        public int CompanyId { get; set; } // Foreign key to Company table
//        public int PostedByUserId { get; set; } // Foreign key to User table

//        public void Mapping(Profile profile)
//        {
//            profile
//                .CreateMap<Core.Entities.Offer.Advertisement, OfferAdvertisementDTO>()
//                .ForMember(dest => dest.CompanyId, opt => opt.MapFrom(src => src.Id))
//                .ReverseMap();
//        }
//    }
//}
