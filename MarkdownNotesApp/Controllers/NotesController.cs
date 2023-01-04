using MarkdownNotesApp.Data;
using MarkdownNotesApp.Extensions;
using MarkdownNotesApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MarkdownNotesApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private readonly NotesApiDbContext _context;

        public NotesController(NotesApiDbContext context)
        {
            _context = context;
        }

        [HttpGet] //Have to specify method for swagger
        public async Task<IActionResult> GetAllNotes()
        {
            var notes = await _context.Notes.Include(n => n.Tags).ToListAsync();
            return Ok(notes.ToNoteViewDto());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetNote([FromRoute] Guid id)
        {
            var note = await _context.Notes.Include(n => n.Tags).SingleOrDefaultAsync(n => n.NoteId == id);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note.ToNoteViewDto());
        }

        [HttpPost]
        public async Task<IActionResult> AddNote(NoteCreateDto createDto)
        {
            var savedTags = await _context.Tags.ToListAsync();
            var noteTags = new List<Tag>();
            var tagsToPersist = new List<Tag>();
            if (createDto.TagCreateDtos.Count > 0)
            {
                createDto.TagCreateDtos.ForEach(tag =>
                    {
                        var tagEntity = savedTags.Find(t => t.Label == tag.Label);
                        if (tagEntity != null)
                        {
                            noteTags.Add(tagEntity);
                        }
                        else
                        {
                            var newTag = new Tag()
                            {
                                TagId = new Guid(),
                                Label = tag.Label
                            };
                            tagsToPersist.Add(newTag);
                        }
                    }
                );
            }

            await _context.AddRangeAsync(tagsToPersist);
            await _context.SaveChangesAsync();
            noteTags.AddRange(tagsToPersist);

            var newNote = new Note()
            {
                NoteId = new Guid(),
                Title = createDto.Title,
                Markdown = createDto.Markdown,
                Tags = noteTags,
            };
            
            await _context.Notes.AddAsync(newNote);
            await _context.SaveChangesAsync();

            return Ok(newNote.ToNoteViewDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateNote([FromRoute] Guid id, NoteUpdateDto updateDto)
        {
            //Finding note to update in database
            var noteToUpdate = await _context.Notes.Include(n => n.Tags).FirstOrDefaultAsync(n => n.NoteId == id);
            //Note isn't found
            if (noteToUpdate == null)
            {
                return NotFound();
            }

            //all existing tags in database
            var savedTags = await _context.Tags.ToListAsync();
            //already existing tags in update dto's tags list
            var noteTags = new List<Tag>();
            //new tags in update dto's tags list
            var newTags = new List<Tag>();

            //There are tags in the update dto's tags list
            if (updateDto.TagCreateDtos.Count > 0)
            {
                updateDto.TagCreateDtos.ForEach(tag =>
                    {
                        var tagEntity = savedTags.Find(t => t.Label == tag.Label);
                        //tag is found in database
                        if (tagEntity != null)
                        {
                            noteTags.Add(tagEntity);
                        }
                        //tag is not in database yet
                        else
                        {
                            var newTag = new Tag()
                            {
                                TagId = new Guid(),
                                Label = tag.Label
                            };
                            //adding new tag to the tagsToPersist list
                            newTags.Add(newTag);
                        }
                    }
                );
            }

            //await _context.AddRangeAsync(tagsToPersist);
            //await _context.SaveChangesAsync();

            noteTags.AddRange(newTags);

            noteToUpdate.Tags.ToList().ForEach(tag =>
            {
                noteToUpdate.Tags.Remove(tag);
                tag.Notes.Remove(noteToUpdate);
            });
            await _context.SaveChangesAsync();

            noteToUpdate.Title = updateDto.Title;
            noteToUpdate.Markdown = updateDto.Markdown;
            noteToUpdate.Tags = noteTags;
            await _context.SaveChangesAsync();
            return Ok(noteToUpdate.ToNoteViewDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
        {
            var noteToDelete = await _context.Notes.FindAsync(id);
            if (noteToDelete == null)
            {
                return NotFound();
            }
            _context.Notes.Remove(noteToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }



    }

    
}
