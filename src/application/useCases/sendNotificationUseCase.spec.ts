import { SendNotificationUseCase } from "./sendNotificationUseCase";
import { InMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";

describe('Send notification', () => {
   it('should be able to send a notification', async () => {
      const notificationRepository = new InMemoryNotificationRepository();
      const sendNotificationUseCase = new SendNotificationUseCase(notificationRepository);

      const { notification } = await sendNotificationUseCase.execute({
         category: 'social',
         content: 'This is a notification',
         recipientId: 'example-recipient-id'
      });

      expect(notificationRepository.notifications).toHaveLength(1);
      expect(notificationRepository.notifications[0]).toEqual(notification);
   })
})