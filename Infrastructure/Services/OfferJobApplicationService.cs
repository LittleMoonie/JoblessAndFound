using AutoMapper;
using AutoMapper.Extensions.ExpressionMapping;
using Core.Entities;
using Core.Entities.Offer;
using Core.Exceptions;
using Core.Repository;
using Infrastructure.DTO.Offer;
using Infrastructure.Services.IServices;

namespace Infrastructure.Services
{
    public class OfferJobApplicationService : IOfferJobApplicationService
    {
        private readonly IRepository<JobApplication> offerRepository;
        private readonly IMapper mapper;

        public OfferJobApplicationService(IRepository<JobApplication> offerRepository, IMapper mapper)
        {
            this.offerRepository = offerRepository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<OfferJobApplicationDTO>> GetJobApplicationsByApplicantUserIdList(int ApplicantUserId)
        {
            if (ApplicantUserId <= 0)
            {
                throw new ArgumentException(
                    "L'ID de l'utilisateur doit être supérieur à zéro.",
                    nameof(ApplicantUserId)
                );
            }

            try
            {
                // Récupérer les entités correspondant à l'ID utilisateur
                var offerJobApplications = await offerRepository.FindAllAsync<JobApplication>(
                    c => c.ApplicantUserId == ApplicantUserId
                );

                // Mapper les entités vers des DTOs
                var offerJobApplicationsDTO = offerJobApplications.Select(o => new OfferJobApplicationDTO
                {
                    OfferJobApplicationId = o.Id,
                    ApplicantUserId = o.ApplicantUserId,
                    AdId = o.AdId,
                    Message = o.Message,
                    CreatedAt = o.CreatedAt,
                    StatusId = o.StatusId,
                });

                return offerJobApplicationsDTO;
            }
            catch (Exception ex)
            {
                // Log l'erreur ici
                throw new ApplicationException(
                    "Une erreur est survenue lors de la récupération des offres.",
                    ex
                );
            }
        }




        public async Task AddJobApplication(
            string? message,
            DateTime? createdAt,
            int adId,
            int applicantUserId,
            int statusId
)
        {
            var newOfferJobApplication = new JobApplication
            {
                Message = message,
                CreatedAt = createdAt ?? DateTime.UtcNow,
                AdId = adId,
                ApplicantUserId = applicantUserId,
                StatusId = statusId,
            };

            await offerRepository.AddAsync(newOfferJobApplication);
        }


        Task IOfferJobApplicationService.AddJobApplication(
            string? message,
            DateTime createdAt
        )
        {
            throw new NotImplementedException();
        }
    }
}
