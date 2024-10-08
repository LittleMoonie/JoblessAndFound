using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourNamespace.Infrastructure.Configurations.User
{
    public class UserConfiguration : IEntityTypeConfiguration<Core.Entities.User.User>
    {
        public void Configure(EntityTypeBuilder<Core.Entities.User.User> builder)
        {
            builder.ToTable("user.User");

            // Define primary key
            builder.HasKey(u => u.Id);

            // Define unique index on Email
            builder.HasIndex(u => u.Email).IsUnique();

            // Define property constraints
            builder.Property(u => u.FirstName).IsRequired().HasMaxLength(100);
            builder.Property(u => u.LastName).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
            builder.Property(u => u.PasswordHash).IsRequired().HasMaxLength(500);
            builder.Property(u => u.PhoneNumber).HasMaxLength(50);

            // Define foreign key constraints
            builder
                .HasOne(u => u.UserTypeEnum)
                .WithMany(ut => ut.Users)
                .HasForeignKey(u => u.UserTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure relationships with other entities
            builder
                .HasMany(u => u.Advertisements)
                .WithOne(a => a.PostedBy)
                .HasForeignKey(a => a.PostedByUserId);

            builder
                .HasMany(u => u.JobApplications)
                .WithOne(j => j.Applicant)
                .HasForeignKey(j => j.ApplicantUserId);

            builder
                .HasMany(u => u.EmailsSent)
                .WithOne(e => e.FromUser)
                .HasForeignKey(e => e.FromUserId);

            builder
                .HasMany(u => u.EmailsReceived)
                .WithOne(e => e.ToUser)
                .HasForeignKey(e => e.ToUserId);
        }
    }
}
