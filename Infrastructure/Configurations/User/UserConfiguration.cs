using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations.User
{
    public class UserConfiguration : IEntityTypeConfiguration<Core.Entities.User.User>
    {
        public void Configure(EntityTypeBuilder<Core.Entities.User.User> builder)
        {
            builder.ToTable("user.User");

            // Define primary key
            builder.HasKey(u => u.Id);

            // Index on UserId if needed
            builder.HasIndex(u => u.Id).IsUnique();

            // Make Id auto-incrementing (value generated on add)
            builder.Property(xp => xp.Id).ValueGeneratedOnAdd();
        }
    }
}
