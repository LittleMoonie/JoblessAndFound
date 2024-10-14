using AutoMapper;
using Core.Entities;
using Core.Entities.Offer;
using Core.Exceptions;
using Core.Repository;
using Infrastructure.DTO.Company;
using Infrastructure.Services.IServices;

namespace Infrastructure.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IRepository<Core.Entities.Company> companyRepository;
        private readonly IRepository<Advertisement> _offerRepository;
        private readonly IMapper mapper;

        public CompanyService(IRepository<Core.Entities.Company> companyRepository, IRepository<Advertisement> offerRepository, IMapper mapper)
        {
            this.companyRepository = companyRepository;
            _offerRepository = offerRepository;
            this.mapper = mapper;
        }

        public async Task<CompanyDTO> GetCompanyById(int companyId)
        {
            var companyDTO = await companyRepository.FindAsync<CompanyDTO>(c => c.Id == companyId);

            return companyDTO;
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
