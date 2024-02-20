// src/nickname/nickname.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NicknameService } from './nickname.service';
import { NicknameController } from './nickname.controller';
import { Nickname } from './nickname.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nickname])], // 導入
  providers: [NicknameService], // 邏輯處理
  controllers: [NicknameController], // 控制器
  exports: [TypeOrmModule.forFeature([Nickname])], // 導出
})
export class NicknameModule {}
