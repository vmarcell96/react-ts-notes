using MarkdownNotesApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System;
using System.Reflection.Emit;

namespace MarkdownNotesApp.Data
{
    public class NotesApiDbContext : DbContext
    {
        public NotesApiDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
