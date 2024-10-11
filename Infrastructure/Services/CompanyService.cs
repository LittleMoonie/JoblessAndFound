using Core.Entities;
using Core.Entities.Enum;
using Core.Exceptions;
using Infrastructure.DTO.Company;
using Infrastructure.Services.IServices;
using Infrastructure.Utility;
using Core.Entities.Offer;
using Core.Repository;
using AutoMapper;

namespace Infrastructure.Services
{
    public class CompanyService(IRepository<Core.Entities.Company> companyRepository, IMapper mapper) : ICompanyService
    {
        public async Task<CompanyDTO> GetCompanyById(int CompanyId)
        {
            var company = await companyRepository.FindByIdAsync(CompanyId);
            if (company == null)
                throw new NotFoundException($"Company with ID {CompanyId} not found.");
            return mapper.Map<CompanyDTO>(company);
        }

        public async Task AddCompany(
            string CompanyName,
            string Location,
            string Domain,
            int EmployeesId
        )
        {

            // Create a new company object with the given details
            var newCompany = new Company
            {
                CompanyName = CompanyName,
                Location = Location,
                Domain = Domain,
                EmployeesId = EmployeesId
            };

            // Add the new user to the repository
            await companyRepository.AddAsync(newCompany);
        }
    }
}
