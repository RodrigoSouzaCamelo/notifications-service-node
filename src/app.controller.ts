import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';


@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId
      }
    })
  }
}
