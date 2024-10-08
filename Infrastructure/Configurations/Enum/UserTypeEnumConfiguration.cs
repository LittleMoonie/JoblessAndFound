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
    public class UserTypeEnumConfiguration : IEntityTypeConfiguration<UserType>
    {
        public void Configure(EntityTypeBuilder<UserType> builder)
        {
            builder.ToTable("enum.UserType");

            // Define primary key
            builder.HasKey(ut => ut.Id);

            // Define unique index on UserType name
            builder.HasIndex(ut => ut.Value).IsUnique();

            // Define property constraints
            builder.Property(ut => ut.Name).IsRequired().HasMaxLength(50);

            // Configure relationships with Users
            builder
                .HasMany(ut => ut.Users)
                .WithOne(u => u.UserTypeEnum)
                .HasForeignKey(u => u.UserTypeId);
        }
    }
}
