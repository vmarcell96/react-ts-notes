namespace MarkdownNotesApp.Models
{
    public class NoteCreateDto
    {
        public string Title { get; set; }
        public string Markdown { get; set; }
        public List<TagCreateDto> TagCreateDtos { get; set; }
    }
}
