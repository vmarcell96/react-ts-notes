import { useState } from 'react'
import { Note, NoteDto, Tag, TagDto } from '../@types/notes';
import { useNotesService } from '../services/notes.service';
import { useTagsService } from '../services/tags.service';

const useNoteFunctions = () => {

    const [notes, setNotes] = useState<Note[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const { getAllNotes, getNoteById, addNewNote, updateNoteById, deleteNoteById } = useNotesService();
    const { getAllTags, updateTagById, deleteTagById } = useTagsService();

    const getNotes = async () => {
        const notes: Array<Note> | null = await getAllNotes();
        if (notes !== null) {
            setNotes(notes);
        }
    };

    const getTags = async () => {
        const tags: Array<Tag> | null = await getAllTags();
        if (tags !== null) {
            setTags(tags);
        }
    };

    async function onCreateNote(data: NoteDto) {
        const newNote = await addNewNote(data);
        if (newNote !== null) {
            setNotes([...notes, newNote]);
        }
    }

    async function updateTag(id: string, data: TagDto) {
        await updateTagById(data, id);
        const updatedTags = tags.map(tag => {
            if (tag.tagId === id) {
                tag.label = data.label;
                return tag;
            }
            return tag;
        })
        setTags(updatedTags);
    }

    // if the notes are updated we have to update the tags also, so the edit tags modal works correctly
    function updateTags() {
        const usedTags: Array<Tag> = [];
        notes.forEach(note => {
            note.tags.forEach(tag => {
                const tagIds = usedTags.map(tag => tag.tagId);
                if (!tagIds.includes(tag.tagId)) {
                    usedTags.push(tag);
                }
            })
        })
        usedTags.forEach(tag => {
            const tagIds = tags.map(tag => {
                return tag.tagId;
            })
            if (!tagIds.includes(tag.tagId)) {
                setTags([...tags, tag]);
            }
        })
    }

    async function deleteTag(id: string) {
        await deleteTagById(id);
        const remainingTags = tags.filter(tag => tag.tagId !== id);
        setTags(remainingTags);
        const newNotes = notes.map(note => {
            note.tags = note.tags.filter(tag => tag.tagId !== id)
            return note;
        });
        setNotes(newNotes);
    }


    async function onUpdateNote(id: string, data: NoteDto) {
        const updatedNote: Note | null = await updateNoteById(data, id);
        const noteToUpdate = notes.find(note => note.noteId === id);
        if (noteToUpdate === undefined) {
            console.log(`Note to update was not found with id:${id}`);
            return;
        }
        if (updatedNote === null) {
            console.log(`Something went wrong with updating note with id:${id}`);
            return;
        }
        setNotes(notes.map(note => {
            if (note.noteId === id) {
                note.title = updatedNote.title;
                note.markdown = updatedNote.markdown;
                note.tags = updatedNote.tags;
                return note;
            }
            return note;
        }))
    }

    function onDeleteNote(id: string) {
        deleteNoteById(id);
        const remainingNotes = notes.filter(note => note.noteId !== id);
        setNotes(remainingNotes);
    }


    return { notes, tags, getNotes, getTags, onCreateNote, updateTag, updateTags, deleteTag, onUpdateNote, onDeleteNote }
}

export default useNoteFunctions