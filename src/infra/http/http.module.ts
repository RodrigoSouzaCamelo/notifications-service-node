import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/useCases/sendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers:[SendNotificationUseCase]
})
export class HttpModule {}
