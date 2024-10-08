using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Core.Entities.Enum
{
    // Enum definition for Company Employee Count
    public enum CompanyEmployeeCountEnum
    {
        EMPLOYEES_1_10 = 1,
        EMPLOYEES_11_50 = 2,
        EMPLOYEES_51_200 = 3,
        EMPLOYEES_201_500 = 4,
        EMPLOYEES_501_1000 = 5,
        EMPLOYEES_1001_5000 = 6,
        EMPLOYEES_5001_10000 = 7,
        EMPLOYEES_10001Plus = 8,
    }

    // Entity class for CompanyEmployeeCountEnum
    public class CompanyEmployeeCount : Entity
    {
        #region Properties
        public string Value { get; set; } = null!;
        public string Name { get; set; } = null!;
        #endregion

        #region Navigation Properties
        public virtual ICollection<Company>? Companies { get; set; }
        #endregion
    }
}
