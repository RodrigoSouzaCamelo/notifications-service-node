import { UnreadNotificationUseCase } from "./unreadNotificationUseCase";
import { InMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";
import { NotificationNotFoundError } from "./errors/notificationNotFoundError";
import { makeNotification } from "@test/factories/notificationFactory";

describe('Unread notification', () => {
   it('should be able to unread a notification', async () => {
      const notificationRepository = new InMemoryNotificationRepository();
      const unreadNotificationUseCase = new UnreadNotificationUseCase(notificationRepository);

      const notification = makeNotification({
         readAt: new Date()
      });

      await notificationRepository.create(notification);

      await unreadNotificationUseCase.execute({
         notificationId: notification.id
      });

      expect(notificationRepository.notifications[0].readAt)
         .toBeNull();
   });

   it('should not be able to unread a non existing notification', async () => {
      const notificationRepository = new InMemoryNotificationRepository();
      const unreadNotificationUseCase = new UnreadNotificationUseCase(notificationRepository);

      expect(() => {
         return unreadNotificationUseCase.execute({
            notificationId: 'fake-notification-id'
         });
      }).rejects.toThrow(NotificationNotFoundError);
   });
})