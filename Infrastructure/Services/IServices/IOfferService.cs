using Infrastructure.DTO.Offer;
using Infrastructure.Repository;

namespace Infrastructure.Services.IServices
{
    public interface IOfferService
    {
        Task<PaginatedResult<OfferAdvertisementDTO>> GetAllOffers(string searchTerm = "", int page = 1,
            int pageSize = 10);
        Task<IEnumerable<OfferAdvertisementDTO>> GetOffersByCompanyId(int companyId);
        Task<OfferAdvertisementDTO> GetOfferById(int offerId);
        Task AddOffer(OfferAdvertisementDTO offerDto);
        Task UpdateOffer(int offerId, OfferAdvertisementDTO updatedOfferDto);
        Task DeleteOffer(int offerId);
        Task ApplyForOffer(int offerId, int userId);
        Task<bool> HasUserApplied(int offerId, int userId);
    }
}
