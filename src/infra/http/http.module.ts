import { CancelNotificationUseCase } from '@application/useCases/cancelNotificationUseCase';
import { CountRecipientNotificationsUseCase } from '@application/useCases/countRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/getRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@application/useCases/readNotificationUseCase';
import { UnreadNotificationUseCase } from '@application/useCases/unReadNotificationUseCase';
import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/useCases/sendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers:[
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase
  ]
})
export class HttpModule {}
