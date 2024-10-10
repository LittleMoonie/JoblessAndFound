using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Offer
{
    public class Attachment : Entity
    {
        #region Properties
        public string FilePath { get; set; } = null!;

        #region Foreign Key Mappings
        public int ApplicationId { get; set; } // Foreign key to JobApplications table
        public int UserId { get; set; } // Foreign key to Users table
        #endregion
        #endregion

        #region Navigation Properties
        public virtual JobApplication? JobApplication { get; set; }
        public virtual User.User? User { get; set; }
        #endregion
    }
}
