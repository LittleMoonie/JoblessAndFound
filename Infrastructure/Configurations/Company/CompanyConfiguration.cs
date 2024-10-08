using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.Company
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Core.Entities.Company>
    {
        public void Configure(EntityTypeBuilder<Core.Entities.Company> builder)
        {
            builder.ToTable("company.Company");

            // Define primary key
            builder.HasKey(c => c.Id);

            // Define property constraints
            builder.Property(c => c.CompanyName).IsRequired().HasMaxLength(255);
            builder.Property(c => c.Location).HasMaxLength(255);
            builder.Property(c => c.Domain).HasMaxLength(255);

            // Define foreign key constraints
            builder
                .HasOne(c => c.CompanyEmployeeCountEnum)
                .WithMany(ce => ce.Companies)
                .HasForeignKey(c => c.EmployeesId);

            // Configure relationships with Advertisements
            builder
                .HasMany(c => c.Advertisements)
                .WithOne(a => a.Company)
                .HasForeignKey(a => a.CompanyId);
        }
    }
}
