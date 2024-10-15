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

        public OfferController(IOfferService OfferService, IMapper mapper)
        {
            _OfferService = OfferService;
            _mapper = mapper;
        }

        #region GET
        [HttpGet("GetOfferByCompanyId")]
        [ProducesResponseType(typeof(OfferAdvertisementDTO), StatusCodes.Status200OK)]
        public async Task<OfferAdvertisementDTO> GetOfferByCompanyId(int companyId)
        {
            return await _OfferService.GetOfferByCompanyId(companyId);
        }

        [ProducesResponseType(typeof(OfferAdvertisementDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]

        #endregion

        #region POST
        [HttpPost("AddOffer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task AddOffer(
            int OfferAdvertisementId,
            string? Description,
            string? Title,
            DateTime? CreatedAt,
            DateTime? UpdatedAt
        )
        {
            await _OfferService.AddOffer(
                Description,
                Title,
                (DateTime)CreatedAt,
                (DateTime)UpdatedAt
            );
        }
        #endregion
    }
}
