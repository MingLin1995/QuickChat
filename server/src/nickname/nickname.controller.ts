// src/nickname/nickname.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NicknameService } from './nickname.service';

@Controller('nicknames') //@Controller('nicknames') 是一個Nest.js控制器的裝飾器，它標記了下面的 NicknameController 類別為一個控制器
export class NicknameController {
  constructor(private readonly nicknameService: NicknameService) {}

  @Get(':name')
  async validate(@Param('name') name: string) {
    const isValid = await this.nicknameService.validateNickname(name);
    return { isValid };
  }

  @Post()
  async create(@Body('name') name: string) {
    try {
      const nickname = await this.nicknameService.createNickname(name);
      return nickname;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    await this.nicknameService.removeNickname(name);
    return { message: '登出成功' };
  }
}
