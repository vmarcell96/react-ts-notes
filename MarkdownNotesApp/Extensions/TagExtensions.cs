using MarkdownNotesApp.Models;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;

namespace MarkdownNotesApp.Extensions
{
    public static class TagExtensions
    {
        public static TagViewDto ToTagViewDto(this Tag tag)
        {
            return new TagViewDto
            {
                TagId = tag.TagId,
                Label = tag.Label,
            };
        }

        public static List<TagViewDto> ToTagViewDto(this List<Tag> tags)
        {
            var tagViews = new List<TagViewDto>();
            tags.ForEach(tag => tagViews.Add(tag.ToTagViewDto()));
            return tagViews;
        }
    }
}
