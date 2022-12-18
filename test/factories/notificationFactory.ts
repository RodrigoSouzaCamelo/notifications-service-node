import { Content } from "@application/entities/notification/content";
import { Notification, NotificationProps } from "@application/entities/notification/notification";

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
   return new Notification({
      category: 'social',
      content: new Content('This is a notification'),
      recipientId: 'recipient-2',
      ...override
   })
}