// src/nickname/nickname.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nickname } from './nickname.entity';

@Injectable() // Injectable 可導入的服務
export class NicknameService {
  constructor(
    @InjectRepository(Nickname) // 操作 Nickname
    private nicknameRepository: Repository<Nickname>,
  ) {}

  // 驗證暱稱是否重複
  async validateNickname(name: string): Promise<boolean> {
    const nickname = await this.nicknameRepository.findOne({ where: { name } });
    return !nickname;
  }
  // 建立暱稱
  async createNickname(name: string): Promise<Nickname> {
    const existingNickname = await this.nicknameRepository.findOne({
      where: { name },
    });
    if (existingNickname) {
      throw new Error('Nickname already exists.');
    }
    const nickname = this.nicknameRepository.create({ name });
    return this.nicknameRepository.save(nickname);
  }
  // 刪除暱稱
  async removeNickname(name: string): Promise<void> {
    await this.nicknameRepository.delete({ name });
  }
}
