import { Notification } from "src/application/entities/notification/notification";
import { NotificationRepository } from "src/application/repositories/NotificationRepository";

export class InMemoryNotificationRepository implements NotificationRepository {
   public notifications: Notification[] = [];

   async findById(notificationId: string): Promise<Notification | null> {
      const notification = this.notifications
         .find(n => n.id === notificationId);

      if (!notification) return null;

      return notification;
   }

   async findManyByManyRecipientId(recipientId: string): Promise<Notification[]> {
      return this.notifications
         .filter(n => n.recipientId === recipientId);
   }

   async countManyByRecipientId(recipientId: string): Promise<number> {
      return this.notifications
         .filter(n => n.recipientId === recipientId)
         .length;
   }

   async create(notification: Notification) {
      this.notifications.push(notification);
   }

   async update(notification: Notification): Promise<void> {
      const notificationIndex = this.notifications
         .findIndex(n => n.id === notification.id);

      if (notificationIndex >= 0) {
         this.notifications[notificationIndex] = notification;
      }
   }
}