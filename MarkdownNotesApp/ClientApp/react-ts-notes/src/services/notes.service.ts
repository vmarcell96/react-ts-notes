import { AxiosResponse } from 'axios';
import { Note, NoteDto } from '../@types/notes';
import { AxiosError } from 'axios';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';

type GetAllNotesResponse = {
    data: Array<Note>;
};

type CustomError = {
    url: string,
    method: string,
    name: string,
    message: string,
}


export function useNotesService() {

    const getAllNotes = async (): Promise<Array<Note> | null> => {
        try {

            const { data, status } = await axiosInstance.get<Array<Note>>("/api/notes");
            return data;

        } catch (error) {

            const err = error as Error | AxiosError;
            if (axios.isAxiosError(err)) {
                // axios error
                console.log('Error at url: ' + err.config?.baseURL + err.config?.url);
                console.log('Method: ' + err.config?.method)
                console.log('Error name: ' + err.name)
                console.log('Error message: ' + err.message)
                console.log('Error response data: ' + err.response?.data)
                console.log('Error response status: ' + err.response?.status)
            } else if (err instanceof Error) {
                // native error
                console.log('unexpected error: ', err);
            } else {
                // unknown
                console.log('unknown error: ', err);
            }
            // const customError = {
            //     url: err.config?.baseURL + err.config?.url
            // }
            return null;
        }
    }

    const getNoteById = async (id: string): Promise<Note | null> => {
        try {

            const { data, status } = await axiosInstance.get<Note>(`/api/notes/${id}`);
            return data;

        } catch (error) {
            
            const err = error as Error | AxiosError;
            if (axios.isAxiosError(err)) {
                // axios error
                console.log('error message: ', err.message);
            } else if (err instanceof Error) {
                // native error
                console.log('unexpected error: ', err);
            } else {
                // unknown
                console.log('unknown error: ', err);
            }
            return null;
        }
        const res: AxiosResponse<Note | any> = await axiosInstance.get<Note>(`/api/notes/${id}`);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    const addNewNote = async (data: NoteDto) => {
        const res: AxiosResponse<Note | any> = await axiosInstance.post<Note>("/api/notes", data);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    const updateNoteById = async (data: NoteDto, id: string) => {
        const res: AxiosResponse<Note | any> = await axiosInstance.put<Note>(`/api/notes/${id}`, data);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    const deleteNoteById = async (id: string) => {
        const res: AxiosResponse<any | any> = await axiosInstance.delete<any>(`/api/notes/${id}`);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    return { getAllNotes, getNoteById, addNewNote, updateNoteById, deleteNoteById }

}