using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.Advertisement
{
    public class AdvertisementConfiguration
        : IEntityTypeConfiguration<Core.Entities.Offer.Advertisement>
    {
        public void Configure(EntityTypeBuilder<Core.Entities.Offer.Advertisement> builder)
        {
            builder.ToTable("offer.Advertisement");

            // Define primary key
            builder.HasKey(a => a.Id);

            // Define property constraints
            builder.Property(a => a.Title).IsRequired().HasMaxLength(255);
            builder.Property(a => a.Description).IsRequired();

            // Define foreign key constraints
            builder
                .HasOne(a => a.Company)
                .WithMany(c => c.Advertisements)
                .HasForeignKey(a => a.CompanyId);

            builder
                .HasOne(a => a.PostedBy)
                .WithMany(u => u.Advertisements)
                .HasForeignKey(a => a.PostedByUserId);
        }
    }
}
