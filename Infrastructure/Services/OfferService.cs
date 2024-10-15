using AutoMapper;
using Core.Entities;
using Core.Entities.Offer;
using Core.Exceptions;
using Core.Repository;
using Infrastructure.DTO.Offer;
using Infrastructure.Services.IServices;

namespace Infrastructure.Services
{
    public class OfferService : IOfferService
    {
        private readonly IRepository<Advertisement> offerRepository;
        private readonly IMapper mapper;

        public OfferService(IRepository<Advertisement> offerRepository, IMapper mapper)
        {
            this.offerRepository = offerRepository;
            this.mapper = mapper;
        }

        public async Task<OfferAdvertisementDTO> GetOfferByCompanyId(int companyId)
        {
            var offerAdvertisementDTO = await offerRepository.FindAsync<OfferAdvertisementDTO>(c => c.Id == companyId);

            return offerAdvertisementDTO;
        }

        public async Task AddOffer(int OfferAdvertisementId,
            string? Description,
            string? Title,
            DateTime? CreatedAt,
            DateTime? UpdatedAt)
        {
            var newOfferAdvertisement = new Advertisement
            {
                Description = Description,
                Title = Title,
                CreatedAt = (DateTime)CreatedAt,
                UpdatedAt = (DateTime)UpdatedAt
            };

            await offerRepository.AddAsync(newOfferAdvertisement);
        }

        Task IOfferService.AddOffer(string? description, string? title, DateTime createdAt, DateTime updatedAt)
        {
            throw new NotImplementedException();
        }
    }
}
