using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.JobApplication
{
    public class JobApplicationConfiguration
        : IEntityTypeConfiguration<Core.Entities.Offer.JobApplication>
    {
        public void Configure(EntityTypeBuilder<Core.Entities.Offer.JobApplication> builder)
        {
            builder.ToTable("offer.JobApplication");

            // Define primary key
            builder.HasKey(ja => ja.Id);

            // Define property constraints
            builder.Property(ja => ja.Message).HasMaxLength(1000);

            // Define foreign key constraints
            builder
                .HasOne(ja => ja.Applicant)
                .WithMany(u => u.JobApplications)
                .HasForeignKey(ja => ja.ApplicantUserId);

            builder
                .HasOne(ja => ja.Advertisement)
                .WithMany(a => a.JobApplications)
                .HasForeignKey(ja => ja.AdId);

            builder
                .HasOne(ja => ja.ApplicationStatusEnum)
                .WithMany(ase => ase.JobApplications)
                .HasForeignKey(ja => ja.StatusId);
        }
    }
}
