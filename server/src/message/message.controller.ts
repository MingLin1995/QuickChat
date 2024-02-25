// src/message/message.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Put(':id')
  async updateMessage(
    @Param('id') id: number,
    @Body() updateMessageDto: { content: string },
  ) {
    return this.messageService.updateMessage(id, updateMessageDto.content);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: number) {
    return this.messageService.deleteMessage(id);
  }
}
