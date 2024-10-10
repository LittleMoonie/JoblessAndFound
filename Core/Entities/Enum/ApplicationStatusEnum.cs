using System.Collections.Generic;
using Core.Entities.Offer;

namespace Core.Entities.Enum
{
    // Enum definition for ApplicationStatus
    public enum ApplicationStatusEnum
    {
        PENDING = 1,
        REVIEWED = 2,
        ACCEPTED = 3,
        REJECTED = 4,
    }

    // Entity class for ApplicationStatusEnum
    public class ApplicationStatus : Entity
    {
        #region Properties
        public string Value { get; set; } = null!;
        public string Name { get; set; } = null!;

        #endregion

        #region Navigation Properties

        public virtual ICollection<JobApplication>? JobApplications { get; set; }

        #endregion
    }
}
