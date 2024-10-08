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
    public class CompanyEmployeeCountEnumConfiguration
        : IEntityTypeConfiguration<CompanyEmployeeCount>
    {
        public void Configure(EntityTypeBuilder<CompanyEmployeeCount> builder)
        {
            builder.ToTable("enum.CompanyEmployeeCount");

            // Define primary key
            builder.HasKey(e => e.Id);

            // Define unique index on EmployeeCount name
            builder.HasIndex(e => e.Value).IsUnique();

            // Define property constraints
            builder.Property(e => e.Name).IsRequired().HasMaxLength(50);

            // Configure relationships with Companies
            builder
                .HasMany(e => e.Companies)
                .WithOne(c => c.CompanyEmployeeCountEnum)
                .HasForeignKey(c => c.EmployeesId);
        }
    }
}
