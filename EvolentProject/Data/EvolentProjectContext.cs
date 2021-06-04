using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EvolentProject.Models
{
    public class EvolentProjectContext : DbContext
    {
        public EvolentProjectContext (DbContextOptions<EvolentProjectContext> options)
            : base(options)
        {
        }

        public DbSet<EvolentProject.Models.Contact> Contact { get; set; }
    }
}
