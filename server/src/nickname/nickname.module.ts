// src/nickname/nickname.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NicknameService } from './nickname.service';
import { NicknameController } from './nickname.controller';
import { Nickname } from './nickname.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nickname])],
  providers: [NicknameService],
  controllers: [NicknameController],
})
export class NicknameModule {}
