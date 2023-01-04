import {  NoteDto, Tag } from "../App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";


type EditNoteProps = {
    onSubmit: (id: string, data: NoteDto) => void
    availableTags: Tag[]
}

export function EditNote({ onSubmit, availableTags }: EditNoteProps ) {
    const note = useNote();
    const tagDtos = note.tags.map(tag => { return {label: tag.label} });
    return (
        <>
            <h1 className="mb-4">Edit note</h1>
            <NoteForm 
                title={note.title}
                markdown={note.markdown}
                tags={tagDtos}
                onSubmit={data => onSubmit(note.noteId, data)} 
                availableTags={availableTags} />
        </>
    )
}