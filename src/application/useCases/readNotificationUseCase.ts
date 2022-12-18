import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { NotificationNotFoundError } from "./errors/notificationNotFoundError";

interface ReadNotificationRequest {
   notificationId: string;
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotificationUseCase {
   constructor(private notificationRepository: NotificationRepository) {}

   async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
      const { notificationId } = request;

      const notification = await this.notificationRepository.findById(notificationId);

      if(!notification) {
         throw new NotificationNotFoundError();
      }

      notification.read();

      this.notificationRepository.update(notification);
   }
}