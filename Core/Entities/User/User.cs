using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Enum;
using Core.Entities.ModerationLogs;
using Core.Entities.Offer;

namespace Core.Entities.User
{
    public class User : Entity
    {
        #region Properties
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        #endregion

        #region Foreign Key Mappings
        public int UserTypeId { get; set; } // Foreign key to UserTypeEnum table
        #endregion

        #region Navigation Properties
        public virtual UserType? UserTypeEnum { get; set; }
        public virtual ICollection<UserRole>? UserRoles { get; set; }
        public virtual ICollection<Advertisement>? Advertisements { get; set; }
        public virtual ICollection<Attachment>? Attachments { get; set; }
        public virtual ICollection<Comment>? Comments { get; set; }
        public virtual ICollection<JobApplication>? JobApplications { get; set; }
        public virtual ICollection<Email>? EmailsSent { get; set; }
        public virtual ICollection<Email>? EmailsReceived { get; set; }
        public virtual ICollection<ModerationLog>? ModerationLogsTaken { get; set; }
        public virtual ICollection<ModerationLog>? ModerationLogsAffected { get; set; }
        #endregion
    }
}
