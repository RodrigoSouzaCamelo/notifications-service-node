import { Notification } from "../entities/notification/notification";

export abstract class NotificationRepository {
   abstract create(notification: Notification): Promise<void>;
   abstract update(notification: Notification): Promise<void>;
   abstract findById(notificationId: string): Promise<Notification | null>;
   abstract countManyByRecipientId(recipientId: string): Promise<number>;
   abstract findManyByManyRecipientId(recipientId: string): Promise<Notification[]>;
}