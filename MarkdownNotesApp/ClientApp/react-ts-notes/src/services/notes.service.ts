import { Note, NoteDto } from '../@types/notes';
import axiosInstance from '../api/axiosInstance';
import useErrorHandler from '../hooks/useErrorHandler';


export function useNotesService() {



    const { handleError } = useErrorHandler();

    const getAllNotes = async (): Promise<Array<Note> | null> => {
        const url = "/api/notes";
        const method = "get";
        try {
            const { data, status } = await axiosInstance.get<Array<Note>>(url);
            return data;

        } catch (err) {
            handleError(url, method, err);
            return null;
        }
    }

    const getNoteById = async (id: string): Promise<Note | null> => {
        const url = `/api/notes/${id}`;
        const method = "get";
        try {

            const { data, status } = await axiosInstance.get<Note>(url);
            return data;

        } catch (err) {
            handleError(url, method, err);
            return null;
        }
    }

    const addNewNote = async (requestData: NoteDto) => {
        const url = "/api/notes";
        const method = "post";
        try {

            const { data, status } = await axiosInstance.post<Note>(url, requestData);
            return data;

        } catch (err) {
            handleError(url, method, err);
            return null;
        }
    }

    const updateNoteById = async (requestData: NoteDto, id: string) => {
        const url = `/api/notes/${id}`;
        const method = "put";
        try {

            const { data, status } = await axiosInstance.put<Note>(url, requestData);
            return data;

        } catch (err) {
            handleError(url, method, err);
            return null;
        }
    }

    const deleteNoteById = async (id: string) => {
        const url = `/api/notes/${id}`;
        const method = "delete";
        try {

            const { data, status } = await axiosInstance.delete<Note>(url);
            return data;

        } catch (err) {
            handleError(url, method, err);
            return null;
        }
    }

    return { getAllNotes, getNoteById, addNewNote, updateNoteById, deleteNoteById }

}