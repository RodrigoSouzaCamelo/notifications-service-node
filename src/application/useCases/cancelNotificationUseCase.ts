import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { NotificationNotFoundError } from "./errors/notificationNotFoundError";

interface CancelNotificationRequest {
   notificationId: string;
}

type CancelNotificationResponse = void

@Injectable()
export class CancelNotificationUseCase {
   constructor(private notificationRepository: NotificationRepository) {}

   async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
      const { notificationId } = request;

      const notification = await this.notificationRepository.findById(notificationId);

      if(!notification) {
         throw new NotificationNotFoundError();
      }

      notification.cancel();

      this.notificationRepository.update(notification);
   }
}