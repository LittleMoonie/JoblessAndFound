using AutoMapper;
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

        public async Task<OfferJobApplicationDTO> GetJobApplicationByApplicantUserIdList(int ApplicantUserId)
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
                // Vérifie que l'ID est correct
                var offerJobApplicationDTO = await offerRepository.FindAsync<OfferJobApplicationDTO>(
                    c => c.ApplicantUserId == ApplicantUserId
                );
                return offerJobApplicationDTO;
            }
            catch (Exception ex)
            {
                // Log l'erreur ici
                throw new ApplicationException(
                    "Une erreur est survenue lors de la récupération de l'offre.",
                    ex
                );
            }
        }

        public async Task AddJobApplication(
            string? Message,
            DateTime CreatedAt,
            int AdId,
            int ApplicantUserId,
            int StatusId
        )
        {
            var newOfferJobApplication = new JobApplication
            {
                Message = Message,
                CreatedAt = CreatedAt,
                AdId = AdId,
                ApplicantUserId = ApplicantUserId,
                StatusId = StatusId,
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
