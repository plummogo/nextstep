using Microsoft.EntityFrameworkCore;

namespace DataAccessLibrary.EntityModels
{
    public partial class NextStepContext : DbContext
    {
        public NextStepContext()
        {
        }

        public NextStepContext(DbContextOptions<NextStepContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Positions> Positions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=EVH06982NB\\SQLEXPRESS;Database=NextStep;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Positions>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Positions");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Organization)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false);
            });
        }
    }
}
