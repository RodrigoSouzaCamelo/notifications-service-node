import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { NotificationNotFoundError } from "./errors/notificationNotFoundError";

interface UnreadNotificationRequest {
   notificationId: string;
}

type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotificationUseCase {
   constructor(private notificationRepository: NotificationRepository) {}

   async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
      const { notificationId } = request;

      const notification = await this.notificationRepository.findById(notificationId);

      if(!notification) {
         throw new NotificationNotFoundError();
      }

      notification.unread();

      this.notificationRepository.update(notification);
   }
}