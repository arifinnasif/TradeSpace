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
    is_sell_ad: boolean;
    unread_messages_count: number;
    am_i_op: boolean;
    last_msg: MessageType;
}





