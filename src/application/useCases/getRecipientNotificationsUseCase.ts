import { Notification } from "@application/entities/notification/notification";
import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/NotificationRepository";

interface GetRecipientNotificationsRequest {
   recipientId: string;
}

interface GetRecipientNotificationResponse {
   notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {
   constructor(private notificationRepository: NotificationRepository) {}

   async execute(
      request: GetRecipientNotificationsRequest
   ): Promise<GetRecipientNotificationResponse> {
      const { recipientId } = request;

      const notifications = await this.notificationRepository
         .findManyByManyRecipientId(recipientId);

      return {
         notifications
      };
   }
}