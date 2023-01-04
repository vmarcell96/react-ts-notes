using MarkdownNotesApp.Data;
using MarkdownNotesApp.Extensions;
using MarkdownNotesApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MarkdownNotesApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : Controller
    {
        private readonly NotesApiDbContext _context;

        public TagsController(NotesApiDbContext context)
        {
            _context = context;
        }

        [HttpGet] //Have to specify method for swagger
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await _context.Tags.ToListAsync();
            return Ok(tags.ToTagViewDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateTag([FromRoute] Guid id, TagUpdateDto updateDto)
        {
            var tagToUpdate = await _context.Tags.FindAsync(id);
            if (tagToUpdate == null)
            {
                return NotFound();
            }
            tagToUpdate.Label = updateDto.Label;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteTag([FromRoute] Guid id)
        {
            var tagToDelete = await _context.Tags.FindAsync(id);
            if (tagToDelete == null)
            {
                return NotFound();
            }
            _context.Tags.Remove(tagToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

    
}
