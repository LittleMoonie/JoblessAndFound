using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.ModerationLogs;

namespace Core.Entities.User
{
    public class UserRole : Entity
    {
        #region Properties
        public string Role { get; set; } = null!;
        public DateTime AssignedAt { get; set; }

        #region Foreign Key Mappings
        public int UserId { get; set; } // Foreign key to Users table
        #endregion
        #endregion

        #region Navigation Properties
        public virtual User? User { get; set; }
        public virtual ICollection<ModerationLog>? ModerationLogs { get; set; }
        #endregion
    }
}
