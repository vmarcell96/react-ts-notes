import axios, { AxiosError } from 'axios';
import { Tag, TagDto } from '../@types/notes';
import axiosInstance from '../api/axiosInstance';


export function useTagsService() {

    const getAllTags = async () => {
        try {

            const { data, status } = await axiosInstance.get<Array<Tag>>("/api/tags",);
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
    }

    const updateTagById = async (data: TagDto, id: string) => {
        const res = await axios.put<Tag>(`/api/tags/${id}`, data);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    const deleteTagById = async (id: string) => {
        const res = await axios.delete<any>(`/api/tags/${id}`);
        if (res !== undefined) {
            return res.data;
        }
        return null;
    }

    return { getAllTags, updateTagById, deleteTagById }

}