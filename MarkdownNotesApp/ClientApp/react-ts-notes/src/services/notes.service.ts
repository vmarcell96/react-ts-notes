import { AxiosResponse } from 'axios';
import axios from '../api/axiosInstance';
import { Note, NoteDto } from '../App';

export function useNotesService() {

    const getAllNotes = async () => {
        const res: AxiosResponse<Array<Note> | any> = await axios.get<Array<Note>>("/api/notes");
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    const getNoteById = async (id: string) => {
        const res: AxiosResponse<Note | any> = await axios.get<Note>(`/api/notes/${id}`);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    const addNewNote = async (data: NoteDto) => {
        const res: AxiosResponse<Note | any> = await axios.post<Note>("/api/notes", data);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    const updateNoteById = async (data: NoteDto, id: string) => {
        const res: AxiosResponse<Note | any> = await axios.put<Note>(`/api/notes/${id}`, data);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    const deleteNoteById = async (id: string) => {
        const res: AxiosResponse<any | any> = await axios.delete<any>(`/api/notes/${id}`);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    return { getAllNotes, getNoteById, addNewNote, updateNoteById, deleteNoteById }

}