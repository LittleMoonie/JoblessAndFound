using AutoMapper;
using Core.Entities;
using Core.Entities.Offer;
using Core.Exceptions;
using Core.Repository;
using Infrastructure.DTO.Offer;
using Infrastructure.Repository;
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
        
        public async Task<PaginatedResult<OfferAdvertisementDTO>> GetAllOffers(string searchTerm = "", int page = 1, int pageSize = 10)
        {
            // Fetch all offers from the repository
            var offers = await offerRepository.GetAllAsync();

            // Apply search filter if searchTerm is provided
            if (!string.IsNullOrEmpty(searchTerm))
            {
                offers = offers.Where(o => o.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));
            }

            // Calculate total offer count before pagination
            int totalCount = offers.Count();

            // Apply pagination
            var paginatedOffers = offers.Skip((page - 1) * pageSize).Take(pageSize);

            // Map to OfferAdvertisementDTO
            var paginatedOfferDtos = mapper.Map<IEnumerable<OfferAdvertisementDTO>>(paginatedOffers);

            // Return the paginated result and total count
            return new PaginatedResult<OfferAdvertisementDTO>
            {
                Data = paginatedOfferDtos,
                TotalCount = totalCount,
            };
        }

        // Fetch offers by CompanyId
        public async Task<IEnumerable<OfferAdvertisementDTO>> GetOffersByCompanyId(int companyId)
        {
            if (companyId <= 0)
            {
                throw new ArgumentException("Company ID must be greater than zero.", nameof(companyId));
            }

            try
            {
                var offers = await offerRepository.FindAllAsync(o => o.CompanyId == companyId);
                return mapper.Map<IEnumerable<OfferAdvertisementDTO>>(offers);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error occurred while fetching offers.", ex);
            }
        }

        // Fetch a single offer by OfferId
        public async Task<OfferAdvertisementDTO> GetOfferById(int offerId)
        {
            if (offerId <= 0)
            {
                throw new ArgumentException("Offer ID must be greater than zero.", nameof(offerId));
            }

            try
            {
                var offer = await offerRepository.FindByIdAsync(offerId);
                if (offer == null)
                {
                    throw new NotFoundException($"Offer with ID {offerId} not found.");
                }
                return mapper.Map<OfferAdvertisementDTO>(offer);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error occurred while fetching the offer.", ex);
            }
        }

        // Add a new offer
        public async Task AddOffer(OfferAdvertisementDTO offerDto)
        {
            var newOffer = mapper.Map<Advertisement>(offerDto);
            await offerRepository.AddAsync(newOffer);
        }

        // Update an existing offer
        public async Task UpdateOffer(int offerId, OfferAdvertisementDTO updatedOfferDto)
        {
            var existingOffer = await offerRepository.FindByIdAsync(offerId);
            if (existingOffer == null)
            {
                throw new NotFoundException($"Offer with ID {offerId} not found.");
            }

            mapper.Map(updatedOfferDto, existingOffer); // Map updated fields
            await offerRepository.UpdateAsync(existingOffer);
        }

        // Delete an offer
        public async Task DeleteOffer(int offerId)
        {
            var offer = await offerRepository.FindByIdAsync(offerId);
            if (offer == null)
            {
                throw new NotFoundException($"Offer with ID {offerId} not found.");
            }

            await offerRepository.DeleteAsync(offer.Id);
        }
    }
}
