import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// 使用 describe 創建測試套件，這裡是對 AppController 的端對端測試
describe('AppController (e2e)', () => {
  let app: INestApplication;

  // 在每個測試案例之前，執行初始化設置
  beforeEach(async () => {
    // 創建一個測試模組，導入 AppModule 表示要測試的模組
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 創建一個 Nest 應用程式實例
    app = moduleFixture.createNestApplication();
    // 初始化應用程式
    await app.init();
  });

  // 編寫一個測試案例，測試 GET 請求 '/' 路徑的行為
  it('/ (GET)', () => {
    // 使用 supertest 發起一個 GET 請求，期望返回 HTTP 狀態碼 200，並且響應內容為 'Hello World!'
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
