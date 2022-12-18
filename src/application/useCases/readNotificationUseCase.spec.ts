import { ReadNotificationUseCase } from "./readNotificationUseCase";
import { InMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";
import { NotificationNotFoundError } from "./errors/notificationNotFoundError";
import { makeNotification } from "@test/factories/notificationFactory";

describe('Read notification', () => {
   it('should be able to read a notification', async () => {
      const notificationRepository = new InMemoryNotificationRepository();
      const readNotificationUseCase = new ReadNotificationUseCase(notificationRepository);

      const notification = makeNotification();

      await notificationRepository.create(notification);

      await readNotificationUseCase.execute({
         notificationId: notification.id
      });

      expect(notificationRepository.notifications[0].readAt)
         .toEqual(expect.any(Date));
   });

   it('should not be able to read a non existing notification', async () => {
      const notificationRepository = new InMemoryNotificationRepository();
      const readNotificationUseCase = new ReadNotificationUseCase(notificationRepository);

      expect(() => {
         return readNotificationUseCase.execute({
            notificationId: 'fake-notification-id'
         });
      }).rejects.toThrow(NotificationNotFoundError);
   });
})