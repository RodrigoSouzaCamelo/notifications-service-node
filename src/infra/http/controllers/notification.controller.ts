import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { SendNotificationUseCase } from 'src/application/useCases/sendNotificationUseCase';


@Controller('notifications')
export class NotificationController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category
    });

    return { notification };
  }
}
