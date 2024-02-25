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
    return this.messageRepository.find();
  }

  async updateMessage(id: number, content: string): Promise<Message> {
    const message = await this.messageRepository.findOneBy({ id });
    if (!message) {
      throw new Error('Message not found');
    }
    message.content = content;
    await this.messageRepository.save(message);
    return message;
  }

  async deleteMessage(id: number): Promise<void> {
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Message not found or already deleted');
    }
  }
}
