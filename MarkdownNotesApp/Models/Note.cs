namespace MarkdownNotesApp.Models
{
    public class Note
    {
        public Guid NoteId { get; set; }
        public string Title { get; set; }
        public string Markdown { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }

    }
}
