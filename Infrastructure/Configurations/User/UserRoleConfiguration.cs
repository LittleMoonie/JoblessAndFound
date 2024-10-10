using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.User
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            // Specify table name in the format category.entityName
            builder.ToTable("user.UserRole");

            // Define primary key
            builder.HasKey(ur => ur.Id);

            // Define property constraints
            builder.Property(ur => ur.Role).IsRequired().HasMaxLength(50);

            // Define foreign key constraints
            builder
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);
        }
    }
}
