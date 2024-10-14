using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.DTO.Offer;

namespace Infrastructure.Services.IServices
{
    public interface IOfferService
    {
        Task<OfferAdvertisementDTO> GetOfferByCompanyId(int companyId);
        Task AddOffer(
            int OfferAdvertisementId,
            string? Description,
            string? Title,
            DateTime? CreatedAt,
            DateTime? UpdatedAt
        );
        Task AddOffer(string? description, string? title, DateTime createdAt, DateTime updatedAt);
    }
}
