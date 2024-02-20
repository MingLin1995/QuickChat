// src/message/message.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(
    @Body() createMessageDto: { username: string; content: string },
  ): Promise<{ id: number; content: string; username: string }> {
    const message = await this.messageService.createMessage(
      createMessageDto.username,
      createMessageDto.content,
    );

    return {
      id: message.id,
      content: message.content,
      username: message.username,
    };
  }

  @Get()
  getMessages() {
    return this.messageService.getMessages();
  }
}
