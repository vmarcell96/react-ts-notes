import axios, { AxiosError } from 'axios';
import useErrorHandler from '../hooks/useErrorHandler';
import { Tag, TagDto } from '../@types/notes';
import axiosInstance from '../api/axiosInstance';


export function useTagsService() {

    const { handleError } = useErrorHandler();

    const getAllTags = async () => {
        const url = "/api/tags";
        const method = "get";
        try {

            const { data, status } = await axiosInstance.get<Array<Tag>>("/api/tags");
            return data;

        } catch (err) {
            handleError(url, method, err);
            return null;
        }
    }

    const updateTagById = async (requestData: TagDto, id: string) => {
        const url = `/api/tags/${id}`;
        const method = "put";
        try {

            const { data, status } = await axiosInstance.put<Tag>(url, requestData);
            return data;

        } catch (err) {
            handleError(url, method, err);
            return null;
        }
    }

    const deleteTagById = async (id: string) => {
        const url = `/api/tags/${id}`;
        const method = "delete";
        try {

            const { data, status } = await axiosInstance.delete<Tag>(url);
            return data;

        } catch (err) {
            handleError(url, method, err);
            return null;
        }
    }

    return { getAllTags, updateTagById, deleteTagById }

}