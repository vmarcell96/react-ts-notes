namespace MarkdownNotesApp.Models
{
    public class NoteUpdateDto
    {
        public string Title { get; set; }
        public string Markdown { get; set; }
        public List<TagCreateDto> TagCreateDtos { get; set; }
    }
}
