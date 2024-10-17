using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Enum;
using Core.Entities.Offer;

namespace Core.Entities
{
    public class Company : Entity
    {
        #region Properties
        public string CompanyName { get; set; } = null!;
        public string? Location { get; set; }
        public string? Domain { get; set; }
        public string? EmployeeCount { get; set; }

        #region Foreign Key Mappings
        public int EmployeesId { get; set; } // Foreign key to CompanyEmployeeCountEnum table
        #endregion
        #endregion

        #region Navigation Properties
        public virtual CompanyEmployeeCount? CompanyEmployeeCountEnum { get; set; }
        public virtual ICollection<Advertisement>? Advertisements { get; set; }
        #endregion
    }
}
