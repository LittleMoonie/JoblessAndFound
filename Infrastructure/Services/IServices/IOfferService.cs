using Infrastructure.DTO.Offer;

namespace Infrastructure.Services.IServices
{
    public interface IOfferService
    {
        Task<IEnumerable<OfferAdvertisementDTO>> GetOffersByCompanyId(int companyId);
        Task<OfferAdvertisementDTO> GetOfferById(int offerId);
        Task AddOffer(OfferAdvertisementDTO offerDto);
        Task UpdateOffer(int offerId, OfferAdvertisementDTO updatedOfferDto);
        Task DeleteOffer(int offerId);
    }
}
