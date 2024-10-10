using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Offer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.Work
{
    public class EmailConfiguration : IEntityTypeConfiguration<Email>
    {
        public void Configure(EntityTypeBuilder<Email> builder)
        {
            builder.ToTable("offer.Email");

            // Define primary key
            builder.HasKey(e => e.Id);

            // Define property constraints
            builder.Property(e => e.Subject).IsRequired().HasMaxLength(255);
            builder.Property(e => e.Body).IsRequired();

            // Define foreign key constraints
            builder
                .HasOne(e => e.FromUser)
                .WithMany(u => u.EmailsSent)
                .HasForeignKey(e => e.FromUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(e => e.ToUser)
                .WithMany(u => u.EmailsReceived)
                .HasForeignKey(e => e.ToUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(e => e.Advertisement)
                .WithMany(a => a.Emails)
                .HasForeignKey(e => e.AdId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
