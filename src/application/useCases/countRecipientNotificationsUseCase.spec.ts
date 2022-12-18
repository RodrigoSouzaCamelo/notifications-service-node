import { CountRecipientNotificationsUseCase } from "./countRecipientNotificationsUseCase";
import { InMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";
import { makeNotification } from "@test/factories/notificationFactory";

describe('Count recipients notifications', () => {
   it('should be able to count recipient notifications', async () => {
      const notificationRepository = new InMemoryNotificationRepository();
      const countRecipientNotificationUseCase = new CountRecipientNotificationsUseCase(
         notificationRepository
      );

      await notificationRepository.create(
         makeNotification({ recipientId: 'recipient-1' })
      );

      await notificationRepository.create(
         makeNotification({ recipientId: 'recipient-1' })
      );

      await notificationRepository.create(
         makeNotification({ recipientId: 'recipient-2' })
      );

      const { count } = await countRecipientNotificationUseCase.execute({
         recipientId: 'recipient-1'
      });

      expect(count).toEqual(2);
   });
})