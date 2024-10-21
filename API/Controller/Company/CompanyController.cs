using Infrastructure.DTO.Company;
using Infrastructure.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet("GetAllCompanies")]
        public async Task<IActionResult> GetAllCompanies([FromQuery] string searchTerm = "", [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var companies = await _companyService.GetAllCompanies(searchTerm, page, pageSize);
            return Ok(companies);
        }

        [HttpGet("GetCompanyById")]
        public async Task<IActionResult> GetCompanyById([FromQuery] int companyId)
        {
            var company = await _companyService.GetCompanyById(companyId);
            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

        [HttpPost("AddCompany")]
        public async Task<IActionResult> AddCompany(CompanyDTO companyDto)
        {
            await _companyService.AddCompany(companyDto.CompanyName, companyDto.Location, companyDto.Domain, companyDto.EmployeesId);
            return Ok();
        }

        [HttpPost("UpdateCompany")]
        public async Task<IActionResult> UpdateCompany(CompanyDTO companyDto)
        {
            await _companyService.UpdateCompany(companyDto.CompanyId, companyDto.CompanyName, companyDto.Location, companyDto.Domain, companyDto.EmployeesId);
            return Ok();
        }

        [HttpPost("DeleteCompany")]
        public async Task<IActionResult> DeleteCompany([FromQuery] int companyId)
        {
            await _companyService.DeleteCompany(companyId);
            return Ok();
        }
    }
}
