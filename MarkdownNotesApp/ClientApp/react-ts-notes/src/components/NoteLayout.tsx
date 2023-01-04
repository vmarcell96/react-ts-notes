import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../App";

type NoteLayoutProps = {
    notes: Note[]
}

export function NoteLayout({notes}: NoteLayoutProps) {
    const {id} = useParams();
    const note = notes.find(n => n.noteId === id);

    if (note == null) return <Navigate to="/" replace />

    // renders out one of the two routes inside the path
    return <Outlet context={note} />
}


export function useNote() {
    return useOutletContext<Note>();
}