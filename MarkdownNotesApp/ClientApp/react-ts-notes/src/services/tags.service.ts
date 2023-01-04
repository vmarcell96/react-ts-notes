import axios from '../api/axiosInstance';
import { Tag, TagDto } from '../App';

export function useTagsService() {

    const getAllTags = async () => {
        const res = await axios.get<Array<Tag>>("/api/tags");
        if (res !== undefined) {
            return res.data;
        }
        return null;
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