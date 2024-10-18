using AutoMapper;
using Infrastructure.DTO.Company;
using Infrastructure.Services;
using Infrastructure.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller.Company
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _CompanyService;
        private readonly IMapper _mapper;

        public CompanyController(ICompanyService CompanyService, IMapper mapper)
        {
            _CompanyService = CompanyService;
            _mapper = mapper;
        }

        #region GET
        [HttpGet("GetCompanyById")]
        [ProducesResponseType(typeof(CompanyDTO), StatusCodes.Status200OK)]
        public async Task<CompanyDTO> GetCompanyById(int companyId)
        {
            return await _CompanyService.GetCompanyById(companyId);
        }

        [ProducesResponseType(typeof(CompanyDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]

        #endregion

        #region POST
        [HttpPost("AddCompany")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task AddCompany(
            string CompanyName,
            string Location,
            string Domain,
            int EmployeesId
        )
        {
            await _CompanyService.AddCompany(
                CompanyName,
                Location,
                Domain,
                EmployeesId
            );
        }
        #endregion
    }
}
