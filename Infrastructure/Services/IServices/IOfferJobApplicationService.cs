using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.DTO.Offer;

namespace Infrastructure.Services.IServices
{
    public interface IOfferJobApplicationService
    {
        Task<OfferJobApplicationDTO> GetJobApplicationByApplicantUserIdList(int ApplicantUserId);
        Task AddJobApplication(
            int OfferJobApplicationId,
            string? Message,
            DateTime CreatedAt,
            int AdId,
            int ApplicantUserId,
            int StatusId
        );
        Task AddJobApplication(string? message, DateTime createdAt);
    }
}