using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Enum;

namespace Core.Entities.Offer
{
    public class JobApplication : Entity
    {
        #region Properties
        public string? Message { get; set; }
        public DateTime CreatedAt { get; set; }

        #region Foreign Key Mappings
        public int AdId { get; set; } // Foreign key to Advertisements table
        public int ApplicantUserId { get; set; } // Foreign key to Users table
        public int StatusId { get; set; } // Foreign key to ApplicationStatusEnum table
        #endregion
        #endregion

        #region Navigation Properties
        public virtual Advertisement? Advertisement { get; set; }
        public virtual User.User? Applicant { get; set; }
        public virtual ApplicationStatus? ApplicationStatusEnum { get; set; }
        public virtual ICollection<Attachment>? Attachments { get; set; }
        #endregion
    }
}
