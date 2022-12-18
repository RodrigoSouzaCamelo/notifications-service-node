import { GetRecipientNotificationsUseCase } from "./getRecipientNotificationsUseCase";
import { InMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";
import { makeNotification } from "@test/factories/notificationFactory";

describe('get recipients notifications', () => {
   it('should be able to get recipient notifications', async () => {
      const notificationRepository = new InMemoryNotificationRepository();
      const getRecipientNotificationsUseCase = new GetRecipientNotificationsUseCase(
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

      const { notifications } = await getRecipientNotificationsUseCase.execute({
         recipientId: 'recipient-1'
      });

      expect(notifications).toHaveLength(2);
      expect(notifications).toEqual(
         expect.arrayContaining([
            expect.objectContaining({ recipientId: 'recipient-1' }),
            expect.objectContaining({ recipientId: 'recipient-1' })
         ])
      );
   });
})