import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 創建一個異步函數 bootstrap，用於啟動 Nest.js 應用程式
async function bootstrap() {
  // 使用 NestFactory.create 創建一個應用程式實例，傳入 AppModule 表示該應用程式的主模組
  const app = await NestFactory.create(AppModule);

  // 呼叫 app.enableCors() 啟用跨域請求，允許來自不同域的請求訪問該應用程式
  app.enableCors();

  // 呼叫 app.listen() 啟動應用程式，監聽端口 3000，以偵測傳入的 HTTP 請求
  await app.listen(3000);
}

// 呼叫 bootstrap 函數，啟動 Nest.js 應用程式
bootstrap();
