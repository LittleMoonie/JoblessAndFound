using AutoMapper;
using Core.Entities;
using Core.Exceptions;
using Core.Repository;
using Infrastructure.DTO.Company;
using Infrastructure.Services.IServices;

namespace Infrastructure.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IRepository<Core.Entities.Company> companyRepository;
        private readonly IMapper mapper;

        public CompanyService(IRepository<Core.Entities.Company> companyRepository, IMapper mapper)
        {
            this.companyRepository = companyRepository;
            this.mapper = mapper;
        }

        public async Task<CompanyDTO> GetCompanyById(int companyId)
        {
            // Utiliser FindByIdAsync pour récupérer l'objet Company
            var company = await companyRepository.FindByIdAsync(companyId);

            if (company == null)
                throw new NotFoundException($"Company with ID {companyId} not found.");

            // Charger explicitement les offres si nécessaire
            await companyRepository.LoadRelatedEntitiesAsync(company, c => c.Offers);

            // Mapper l'entité Company vers CompanyDTO
            return mapper.Map<CompanyDTO>(company);
        }

        public async Task AddCompany(string CompanyName, string Location, string Domain, int EmployeesId)
        {
            var newCompany = new Company
            {
                CompanyName = CompanyName,
                Location = Location,
                Domain = Domain,
                EmployeesId = EmployeesId
            };

            await companyRepository.AddAsync(newCompany);
        }
    }
}
