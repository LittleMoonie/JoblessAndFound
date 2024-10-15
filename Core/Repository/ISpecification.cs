using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; } // Assurez-vous que cette propriété existe
        List<string> IncludeStrings { get; }
        // Ajoutez d'autres propriétés selon vos besoins
    }

}
