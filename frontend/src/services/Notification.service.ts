import API from "../api/axios.config";

export interface NotificationType {
  id: number;
  title: string;
  type: string;
  description: string;
  createdAt: string;
}

class NotificationService {
  async getNotifications() {
    return (await API.get(`profile/notifications`)).data.notification_list;
  }
}

export const notificationService = new NotificationService();