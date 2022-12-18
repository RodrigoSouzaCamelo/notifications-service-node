import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { SendNotificationUseCase } from 'src/application/useCases/sendNotificationUseCase';
import { NotificationViewModel } from '../viewModels/notificationViewModel';
import { CancelNotificationUseCase } from '@application/useCases/cancelNotificationUseCase';
import { ReadNotificationUseCase } from '@application/useCases/readNotificationUseCase';
import { UnreadNotificationUseCase } from '@application/useCases/unReadNotificationUseCase';
import { CountRecipientNotificationsUseCase } from '@application/useCases/countRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/getRecipientNotificationsUseCase';


@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({
      notificationId: id
    });
  }

  @Get('recipient/:recipientId/count')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId
    });

    return {
      count
    };
  }

  @Get('recipient/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotificationsUseCase.execute({
      recipientId
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({
      notificationId: id
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({
      notificationId: id
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category
    });

    return {
      notification: NotificationViewModel.toHTTP(notification)
    };
  }
}
