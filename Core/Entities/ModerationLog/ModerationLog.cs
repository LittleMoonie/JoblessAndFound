using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Offer;
using Core.Entities.User;

namespace Core.Entities.ModerationLogs
{
    public class ModerationLog : Entity
    {
        #region Properties
        public string? Action { get; set; }
        public string? Description { get; set; }
        public DateTime Timestamp { get; set; }

        #region Foreign Key Mappings
        public int ActionTakenByUserId { get; set; } // Foreign key to Users table
        public int? AffectedUserId { get; set; } // Foreign key to Users table
        public int? AdId { get; set; } // Foreign key to Advertisements table
        public int UserRoleId { get; set; } // Foreign key to UserRoles table
        #endregion
        #endregion

        #region Navigation Properties
        public virtual User.User? ActionTakenBy { get; set; }
        public virtual User.User? AffectedUser { get; set; }
        public virtual Advertisement? Advertisement { get; set; }
        public virtual UserRole? UserRole { get; set; }
        #endregion
    }
}
