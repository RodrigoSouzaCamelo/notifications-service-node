import { Injectable } from "@nestjs/common";
import { Notification } from "src/application/entities/notification/notification";
import { NotificationRepository } from "src/application/repositories/NotificationRepository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
   constructor(private prismaService: PrismaService) {}
    
   async create(notification: Notification): Promise<void> {
      const { id, content, recipientId, category, createdAt, readAt } = notification;

      await this.prismaService.notification.create({
         data: {
            id: id,
            content: content.value,
            recipientId,
            category,
            createdAt,
            readAt
         }
      });
   }
}