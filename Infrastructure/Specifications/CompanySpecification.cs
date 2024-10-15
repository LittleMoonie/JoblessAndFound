using Ardalis.Specification;
using Core.Entities;
using System.Linq.Expressions;

public class CompanySpecification : Specification<Company>
{
    public CompanySpecification(int companyId)
    {
        Query.Where( c => c.Id == companyId); // Définit le critère
    }

}
