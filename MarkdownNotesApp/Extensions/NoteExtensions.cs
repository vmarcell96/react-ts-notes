using MarkdownNotesApp.Models;

namespace MarkdownNotesApp.Extensions
{
    public static class NoteExtensions
    {
        public static NoteViewDto ToNoteViewDto(this Note note)
        {
            return new NoteViewDto
            {
                NoteId = note.NoteId,
                Title = note.Title,
                Markdown = note.Markdown,
                Tags = note.Tags.ToList().ToTagViewDto(),
            };
        }

        public static List<NoteViewDto> ToNoteViewDto(this List<Note> notes)
        {
            var noteViews = new List<NoteViewDto>();
            notes.ForEach(note => noteViews.Add(note.ToNoteViewDto()));
            return noteViews;
        }
    }
}
