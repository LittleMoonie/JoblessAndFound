using Core.Entities.Authentication;
using Infrastructure.Utility;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.Authentication
{
    public class JwtKeyConfiguration : IEntityTypeConfiguration<JwtKey>
    {
        public void Configure(EntityTypeBuilder<JwtKey> builder)
        {
            builder.ToTable("authentication.JwtKeys"); // Specify the table name in the database

            // Define primary key
            builder.HasKey(jk => jk.Id);

            // Define property constraints
            builder.Property(jk => jk.KeyValue).IsRequired().HasMaxLength(255); // Adjust length as needed

            builder.Property(jk => jk.CreatedAt).IsRequired();

            builder.Property(jk => jk.IsActive).IsRequired();
        }
    }
}
