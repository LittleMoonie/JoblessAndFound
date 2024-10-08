using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Enum
{
    // Enum definition for UserType
    public enum UserTypeEnum
    {
        USER = 1,
        RECRUITER = 2,
        MODERATOR = 3,
        ADMIN = 4,
    }

    // Entity class for UserTypeEnum
    public class UserType : Entity
    {
        #region Properties
        public string Value { get; set; } = null!;
        public string Name { get; set; } = null!;
        #endregion

        #region Navigation Properties
        public virtual ICollection<User.User>? Users { get; set; }
        #endregion
    }
}
