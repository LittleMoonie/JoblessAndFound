using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Offer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class AttachmentConfiguration : IEntityTypeConfiguration<Attachment>
    {
        public void Configure(EntityTypeBuilder<Attachment> builder)
        {
            builder.ToTable("offer.Attachment");

            // Define primary key
            builder.HasKey(a => a.Id);

            // Define property constraints
            builder.Property(a => a.FilePath).IsRequired().HasMaxLength(500);

            // Define foreign key constraints
            builder
                .HasOne(a => a.JobApplication)
                .WithMany(ja => ja.Attachments)
                .HasForeignKey(a => a.ApplicationId);

            builder.HasOne(a => a.User).WithMany(u => u.Attachments).HasForeignKey(a => a.UserId);
        }
    }
}
