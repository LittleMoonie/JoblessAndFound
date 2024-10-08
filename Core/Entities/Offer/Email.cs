using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Offer
{
    public class Email : Entity
    {
        #region Properties
        public string Subject { get; set; } = null!;
        public string Body { get; set; } = null!;
        public DateTime SentAt { get; set; }

        #region Foreign Key Mappings
        public int FromUserId { get; set; } // Foreign key to Users table
        public int ToUserId { get; set; } // Foreign key to Users table
        public int? AdId { get; set; } // Optional foreign key to Advertisements table
        #endregion
        #endregion

        #region Navigation Properties
        public virtual User.User? FromUser { get; set; } // User who sent the email
        public virtual User.User? ToUser { get; set; } // User who received the email
        public virtual Advertisement? Advertisement { get; set; } // Optional advertisement the email is related to
        #endregion
    }
}
