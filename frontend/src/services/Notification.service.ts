import API from "../api/axios.config";
import { Cookies } from "react-cookie";

export interface NotificationType {
  id: number;
  title: string;
  type: string;
  description: string;
  created_at: string;
}

class NotificationService {
  async getNotifications() {
    console.log("getNotifications");
    console.log(new Cookies().get("token"));
    return ((await API.get(`profile/notifications`)).data as NotificationType[]);
  }
}

export const notificationService = new NotificationService();