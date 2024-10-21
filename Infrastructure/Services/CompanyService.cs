using AutoMapper;
using Core.Entities;
using Core.Entities.Offer;
using Core.Exceptions;
using Core.Repository;
using Infrastructure.DTO.Company;
using Infrastructure.Repository;
using Infrastructure.Services.IServices;

namespace Infrastructure.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IRepository<Company> _companyRepository;
        private readonly IMapper _mapper;

        public CompanyService(IRepository<Company> companyRepository, IMapper mapper)
        {
            _companyRepository = companyRepository;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<CompanyDTO>> GetAllCompanies(string searchTerm = "", int page = 1, int pageSize = 10)
        {
            // Fetch all companies from the repository
            var companies = await _companyRepository.GetAllAsync();

            // Apply search filter if searchTerm is provided
            if (!string.IsNullOrEmpty(searchTerm))
            {
                companies = companies.Where(c => c.CompanyName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));
            }

            // Calculate total company count before pagination
            int totalCount = companies.Count();

            // Apply pagination
            var paginatedCompanies = companies.Skip((page - 1) * pageSize).Take(pageSize);

            // Map to CompanyDTO
            var paginatedCompanyDtos = _mapper.Map<IEnumerable<CompanyDTO>>(paginatedCompanies);

            // Return the paginated result and total count
            return new PaginatedResult<CompanyDTO>
            {
                Data = paginatedCompanyDtos,
                TotalCount = totalCount,
            };
        }

        public async Task<CompanyDTO> GetCompanyById(int companyId)
        {
            var company = await _companyRepository.FindByIdAsync(companyId);
            if (company == null)
                throw new NotFoundException($"Company with ID {companyId} not found.");

            return _mapper.Map<CompanyDTO>(company);
        }

        public async Task AddCompany(string companyName, string location, string domain, int employeesId)
        {
            var newCompany = new Company
            {
                CompanyName = companyName,
                Location = location,
                Domain = domain,
                EmployeesId = employeesId
            };

            await _companyRepository.AddAsync(newCompany);
        }

        public async Task UpdateCompany(int companyId, string companyName, string location, string domain, int employeesId)
        {
            var existingCompany = await _companyRepository.FindByIdAsync(companyId);
            if (existingCompany == null)
                throw new NotFoundException($"Company with ID {companyId} not found.");

            existingCompany.CompanyName = companyName;
            existingCompany.Location = location;
            existingCompany.Domain = domain;
            existingCompany.EmployeesId = employeesId;

            await _companyRepository.UpdateAsync(existingCompany);
        }

        public async Task DeleteCompany(int companyId)
        {
            var company = await _companyRepository.FindByIdAsync(companyId);
            if (company == null)
                throw new NotFoundException($"Company with ID {companyId} not found.");

            await _companyRepository.DeleteAsync(companyId);
        }
    }

}
