import { Notification } from "src/application/entities/notification/notification";
import { NotificationRepository } from "src/application/repositories/NotificationRepository";

export class InMemoryNotificationRepository implements NotificationRepository {
   public notifications: Notification[] = [];

   async create(notification: Notification) {
      this.notifications.push(notification);
   }
}