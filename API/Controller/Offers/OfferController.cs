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
    public class OfferController : ControllerBase
    {
        private readonly IOfferService _OfferService;
        private readonly IMapper _mapper;
        private readonly ILogger<OfferController> _logger; // Ajout du logger

        public OfferController(
            IOfferService OfferService,
            IMapper mapper,
            ILogger<OfferController> logger
        )
        {
            _OfferService = OfferService;
            _mapper = mapper;
            _logger = logger; // Assignation du logger
        }

        #region GET
        [HttpGet("GetAllOffers")]
        public async Task<IActionResult> GetAllOffers(string searchTerm = "", int page = 1, int pageSize = 10)
        {
            var result = await _OfferService.GetAllOffers(searchTerm, page, pageSize);
            return Ok(result);
        }

        
        [HttpGet("GetOfferByCompanyId")]
        public async Task<IActionResult> GetOfferByCompanyId(int CompanyId)
        {
            if (CompanyId <= 0)
            {
                return BadRequest("Invalid company ID.");
            }

            try
            {
                var offer = await _OfferService.GetOffersByCompanyId(CompanyId);
                if (offer == null)
                {
                    return NotFound();
                }

                return Ok(offer);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Erreur lors de la récupération de l'offre pour la compagnie {CompanyId}",
                    CompanyId
                );
                return StatusCode(500, ex.Message); // Pour voir le message d'erreur lors du débogage
            }
        }

        #endregion

        #region POST
        [HttpPost("AddOffer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task AddOffer(OfferAdvertisementDTO offerDto)
        {
            await _OfferService.AddOffer(offerDto);
        }
        #endregion
    }
}
