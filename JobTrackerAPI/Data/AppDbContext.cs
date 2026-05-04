using JobTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

       public DbSet<Job> Jobs { get; set; }
       public DbSet<User> Users { get; set; }

    }
}
