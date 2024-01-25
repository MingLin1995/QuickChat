// 引入 Nest.js 的 Injectable 裝飾器
import { Injectable } from '@nestjs/common';

// 使用 @Injectable 裝飾器將這個類別標記為一個可注入的服務提供者
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
