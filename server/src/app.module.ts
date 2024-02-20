// 引入 Nest.js 的 Module 裝飾器
import { Module } from '@nestjs/common';
// // 引入 AppController，這個模組將包含 AppController
// import { AppController } from './app.controller';
// // 引入 AppService，這個模組將包含 AppService
// import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { NicknameModule } from './nickname/nickname.module';
import { MessageModule } from './message/message.module';

// // 使用 @Module 裝飾器定義一個 Nest.js 模組，這個模組將包含控制器和提供者
// @Module({
//   imports: [], // 在這裡可以指定模組的依賴，這個模組沒有依賴其他模組，所以是空的
//   controllers: [AppController], // 指定這個模組中包含的控制器，這裡是 AppController
//   providers: [AppService], // 指定這個模組中包含的服務提供者，這裡是 AppService
// })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // 使用 docker-compose.yml 中定義的服務名稱 不能用localhost
      port: 5432,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //定義了TypeORM實體的位置，對應到資料庫表。
      synchronize: true, // 設置為 true 表示在開發模式下會自動創建資料庫表，這在生產環境中應該設置為 false 手動管理數據庫結構以確保穩定性。
    }),
    NicknameModule,
    MessageModule,
  ],
})
export class AppModule {} // 定義 AppModule 類別，表示這個模組的主要定義
