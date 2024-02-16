// src/message/message.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './message.entity';
import { NicknameModule } from '../nickname/nickname.module'; // 引入NicknameModule

@Module({
  imports: [TypeOrmModule.forFeature([Message]), NicknameModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
