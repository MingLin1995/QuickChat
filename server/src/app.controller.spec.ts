import { Test, TestingModule } from '@nestjs/testing';
// 引入 AppController 和 AppService，測試 AppController
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 使用 describe 函數定義一個測試套件，名稱為 'AppController'
describe('AppController', () => {
  // 宣告一個變數 appController，用於儲存要測試的 AppController 實例
  let appController: AppController;

  // 在每個測試案例之前執行的 beforeEach 函數
  beforeEach(async () => {
    // 使用 Test.createTestingModule 創建一個測試模塊
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // 指定要測試的控制器，這裡是 AppController
      providers: [AppService], // 指定相關的提供者，這裡是 AppService
    }).compile();

    // 通過 app.get 方法取得 AppController 實例，並存儲在 appController 變數中
    appController = app.get<AppController>(AppController);
  });

  // 使用 describe 函數定義一個測試套件，名稱為 'root'
  describe('root', () => {
    // 定義一個測試案例，名稱為 'should return "Hello World!"'
    it('should return "Hello World!"', () => {
      // 使用 expect 斷言來測試 appController.getHello() 方法的返回值是否等於 'Hello World!'
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
