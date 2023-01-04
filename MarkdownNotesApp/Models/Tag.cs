namespace MarkdownNotesApp.Models
{
    public class Tag
    {
        public Guid TagId { get; set; }
        public string? Label { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
}
