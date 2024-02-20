// src/message/message.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Nickname } from '../nickname/nickname.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Nickname)
    private nicknameRepository: Repository<Nickname>,
  ) {}

  async createMessage(username: string, content: string): Promise<Message> {
    // 確認 username 是否有效
    if (!username) {
      throw new Error('Username cannot be empty');
    }

    const nickname = await this.nicknameRepository.findOne({
      where: { name: username },
    });

    if (!nickname) {
      throw new Error('Nickname not found');
    }

    // 確認創建 Message 實體時 username 被正確設置
    const message = this.messageRepository.create({
      username,
      content,
    });

    await this.messageRepository.save(message);
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return this.messageRepository.find(); // 簡單地從資料庫檢索所有消息
  }
}
