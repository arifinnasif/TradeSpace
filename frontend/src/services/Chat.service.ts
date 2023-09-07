export interface MessageType {
    sender_username: string;
    receiver_username: string;
    message: string;
    timestamp: string;
    is_image: boolean; 
    is_read_by_receiver: boolean;
    is_my_message: boolean;
}