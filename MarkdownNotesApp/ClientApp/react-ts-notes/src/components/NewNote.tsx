import { NoteDto, Tag } from "../App";
import { NoteForm } from "./NoteForm";


type NewNoteProps = {
    onSubmit: (data: NoteDto) => void
    availableTags: Tag[]
}

export function NewNote({ onSubmit, availableTags }: NewNoteProps ) {
    return (
        <>
            <h1 className="mb-4">New note</h1>
            <NoteForm onSubmit={onSubmit} availableTags={availableTags} />
        </>
    )
}