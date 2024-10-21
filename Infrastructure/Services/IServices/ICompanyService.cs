using Infrastructure.DTO.Company;
using Infrastructure.Repository;
using System.Threading.Tasks;

namespace Infrastructure.Services.IServices
{
    public interface ICompanyService
    {
        Task<PaginatedResult<CompanyDTO>> GetAllCompanies(string searchTerm = "", int page = 1, int pageSize = 10);
        Task<CompanyDTO> GetCompanyById(int companyId);
        Task AddCompany(string companyName, string location, string domain, int employeesId);
        Task UpdateCompany(int companyId, string companyName, string location, string domain, int employeesId);
        Task DeleteCompany(int companyId);
    }
}
