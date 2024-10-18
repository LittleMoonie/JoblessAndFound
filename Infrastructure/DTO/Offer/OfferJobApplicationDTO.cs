using AutoMapper;
using Core.Entities.Offer;
using Core.Mapping;

namespace Infrastructure.DTO.Offer
{
    public class OfferJobApplicationDTO : IMap
    {
        public int OfferJobApplicationId { get; set; }
        public string? Message { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? AdId { get; set; } // Foreign key to Advertisements table
        public int? ApplicantUserId { get; set; } // Foreign key to Users table
        public int? StatusId { get; set; } // Foreign key to ApplicationStatusEnum table

        public void Mapping(Profile profile)
        {
            profile.CreateMap<JobApplication, OfferJobApplicationDTO>()
                .ForMember(dest => dest.OfferJobApplicationId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.AdId, opt => opt.MapFrom(src => src.AdId))
                .ForMember(dest => dest.ApplicantUserId, opt => opt.MapFrom(src => src.ApplicantUserId))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ReverseMap();
        }
    }
}