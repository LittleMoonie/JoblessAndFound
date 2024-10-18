using AutoMapper;
using Core.Entities;
using Infrastructure.DTO.Offer;
using Infrastructure.Services;
using Infrastructure.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller.Offers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfferJobApplicationController : ControllerBase
    {
        private readonly IOfferJobApplicationService _OfferJobApplicationService;
        private readonly IMapper _mapper;
        private readonly ILogger<OfferJobApplicationController> _logger; // Ajout du logger

        public OfferJobApplicationController(
            IOfferJobApplicationService OfferJobApplicationService,
            IMapper mapper,
            ILogger<OfferJobApplicationController> logger
        )
        {
            _OfferJobApplicationService = OfferJobApplicationService;
            _mapper = mapper;
            _logger = logger; // Assignation du logger
        }

        #region GET
        [HttpGet("GetJobApplicationsByApplicantUserIdList")]
        public async Task<IEnumerable<OfferJobApplicationDTO>> GetJobApplicationsByApplicantUserIdList(int ApplicantUserId)
        {



                return await _OfferJobApplicationService.GetJobApplicationsByApplicantUserIdList(ApplicantUserId);


        }

        #endregion

        #region POST
        [HttpPost("AddJobApplication")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task AddJobApplication(
            string? Message,
            DateTime? CreatedAt,
            int AdId,
            int ApplicantUserId,
            int StatusId
        )
        {
            await _OfferJobApplicationService.AddJobApplication(
                Message,
                CreatedAt ?? DateTime.UtcNow, // Valeur par défaut si null
                AdId,
                ApplicantUserId,
                StatusId
            );
        }
        #endregion
    }
}
