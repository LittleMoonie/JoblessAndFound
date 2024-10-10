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
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("offer.Comment");

            // Define primary key
            builder.HasKey(c => c.Id);

            // Define property constraints
            builder.Property(c => c.CommentText).IsRequired();

            // Define foreign key constraints
            builder
                .HasOne(c => c.Advertisement)
                .WithMany(a => a.Comments)
                .HasForeignKey(c => c.AdId);

            builder.HasOne(c => c.User).WithMany(u => u.Comments).HasForeignKey(c => c.UserId);
        }
    }
}
