using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Core.Entities.Company;
using Infrastructure.DTO.Company;

namespace Infrastructure.Services.IServices
{
    public interface ICompanyService
    {
        Task<CompanyDTO> GetCompanyById(int companyId);
        Task AddCompany(
            string CompanyName,
            string Location,
            string Domain,
            int EmployeesId
        );
    }
}
