import API from "../api/axios.config";

export const getThread = async (ad_id: number) => {
    return (await API.get(`/chat/${ad_id}`, {
        withCredentials: true,
    })).data;
}