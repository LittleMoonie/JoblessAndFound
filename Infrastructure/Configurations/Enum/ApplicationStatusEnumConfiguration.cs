using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Enum;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.Enum
{
    public class ApplicationStatusEnumConfiguration : IEntityTypeConfiguration<ApplicationStatus>
    {
        public void Configure(EntityTypeBuilder<ApplicationStatus> builder)
        {
            builder.ToTable("enum.ApplicationStatus");

            // Define primary key
            builder.HasKey(a => a.Id);

            // Define unique index on Status name
            builder.HasIndex(a => a.Value).IsUnique();

            // Define property constraints
            builder.Property(a => a.Name).IsRequired().HasMaxLength(50);

            // Configure relationships with JobApplications
            builder
                .HasMany(a => a.JobApplications)
                .WithOne(j => j.ApplicationStatusEnum)
                .HasForeignKey(j => j.StatusId);
        }
    }
}
