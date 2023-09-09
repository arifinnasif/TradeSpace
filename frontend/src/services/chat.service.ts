import API from "../api/axios.config";

export interface MessageType {
    sender_username: string;
    receiver_username: string;
    message: string;
    timestamp: string;
    is_image: boolean;
    is_read_by_receiver: boolean;
    is_my_message: boolean;
}



export interface InboxType {
    thread_id: string;
    receiver_fullname: string;
    receiver_username: string;
    receiver_profile_pic: string;
    ad_id: number;
    ad_title: string;
    ad_image: string;
    ad_price: number;
    is_sell_ad: boolean;
    unread_messages_count: number;
    am_i_op: boolean;
    last_message: MessageType;
}





export const getInbox = async () => {
    return (await API.get("/chat/inbox/", {
        withCredentials: true,
    })).data;
}

export const getThread = async (ad_id: number) => {
    return (await API.get(`/chat/${ad_id}`, {
        withCredentials: true,
    })).data;
}

export const getMessages = async (thread_id: string) => {
    return (await API.get(`/chat/threads/${thread_id}`, {
        withCredentials: true,
    })).data;
}

export const sendMessage = async (thread_id: string, message: string, is_image: boolean) => {
    return (await API.post(`/chat/threads/${thread_id}`, {
        message,
        is_image,
    }, {
        withCredentials: true,
    })).data;
}