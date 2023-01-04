namespace MarkdownNotesApp.Models
{
    public class NoteViewDto
    {
        public Guid NoteId { get; set; }
        public string Title { get; set; }
        public string Markdown { get; set; }
        public virtual ICollection<TagViewDto>? Tags { get; set; }
    }
}
