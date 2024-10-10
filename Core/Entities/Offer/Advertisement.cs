using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.ModerationLogs;

namespace Core.Entities.Offer
{
    public class Advertisement : Entity
    {
        #region Properties
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        #region Foreign Key Mappings
        public int CompanyId { get; set; } // Foreign key to Companies table
        public int PostedByUserId { get; set; } // Foreign key to Users table
        #endregion
        #endregion

        #region Navigation Properties
        public virtual Company? Company { get; set; }
        public virtual User.User? PostedBy { get; set; }
        public virtual ICollection<JobApplication>? JobApplications { get; set; }
        public virtual ICollection<ModerationLog>? ModerationLogs { get; set; }
        public virtual ICollection<Email>? Emails { get; set; }
        public virtual ICollection<Comment>? Comments { get; set; }
        #endregion
    }
}
