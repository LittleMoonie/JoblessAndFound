using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Offer
{
    public class Comment : Entity
    {
        #region Properties
        public string CommentText { get; set; } = null!;
        public DateTime PostedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        #endregion

        #region Foreign Key Mappings
        public int AdId { get; set; } // Foreign key to Advertisements table
        public int UserId { get; set; } // Foreign key to Users table
        #endregion

        #region Navigation Properties
        public virtual Advertisement? Advertisement { get; set; }
        public virtual User.User? User { get; set; }
        #endregion
    }
}
