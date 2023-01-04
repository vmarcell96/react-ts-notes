using MarkdownNotesApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System;
using System.Reflection.Emit;
using Microsoft.Extensions.Configuration;

namespace MarkdownNotesApp.Data
{
    public class NotesApiDbContext : DbContext
    {

        protected readonly IConfiguration Configuration;

        public NotesApiDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Tag> Tags { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sqlite database
            options.UseSqlite(Configuration.GetConnectionString("NotesApiConnectionString"));
        }
    }
}
