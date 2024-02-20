// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
// 引入 AppService，這個服務將在控制器中使用
import { AppService } from './app.service';

// 使用 @Controller 裝飾器定義一個控制器，這裡未指定路由前綴，因此將根路由映射到該控制器
@Controller()
export class AppController {
  // 控制器的建構子，接受一個私有的 appService 參數
  constructor(private readonly appService: AppService) {}

  // 使用 @Get 裝飾器定義一個路由處理函數，當收到 GET 請求時，將執行這個函數
  @Get()
  getHello(): string {
    // 調用 appService 中的 getHello 方法並返回其結果
    return this.appService.getHello();
  }

  // 使用 @Get 裝飾器定義另一個路由處理函數，當收到 GET 請求 '/api/greeting' 時，將執行這個函數
  @Get('api/greeting')
  getGreeting(): string {
    // 返回固定的字符串，表示成功連接後端伺服器
    return '成功連接後端伺服器啦！！！';
  }
}
