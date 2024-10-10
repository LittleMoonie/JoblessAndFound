using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.ModerationLogs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.ModerationLogs
{
    public class ModerationLogConfiguration : IEntityTypeConfiguration<ModerationLog>
    {
        public void Configure(EntityTypeBuilder<ModerationLog> builder)
        {
            // Specify table name in the format category.entityName
            builder.ToTable("moderationLogs.ModerationLog");

            // Define primary key
            builder.HasKey(ml => ml.Id);

            // Define property constraints
            builder.Property(ml => ml.Action).IsRequired().HasMaxLength(255);
            builder.Property(ml => ml.Description).HasMaxLength(1000);

            // Define foreign key constraints
            builder
                .HasOne(ml => ml.ActionTakenBy)
                .WithMany(u => u.ModerationLogsTaken)
                .HasForeignKey(ml => ml.ActionTakenByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(ml => ml.AffectedUser)
                .WithMany(u => u.ModerationLogsAffected)
                .HasForeignKey(ml => ml.AffectedUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(ml => ml.Advertisement)
                .WithMany(a => a.ModerationLogs)
                .HasForeignKey(ml => ml.AdId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(ml => ml.UserRole)
                .WithMany(ur => ur.ModerationLogs)
                .HasForeignKey(ml => ml.UserRoleId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
