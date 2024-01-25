import React from 'react'; // 匯入React庫
import ReactDOM from 'react-dom/client'; // 匯入ReactDOM庫的createRoot方法，用於渲染React應用程序
import './index.css'; // 匯入應用程序的CSS樣式文件
import App from './App'; // 匯入應用程序的主組件
import reportWebVitals from './reportWebVitals'; // 匯入性能測試報告的函數

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// 如果想測試應用程序的性能，可以使用reportWebVitals函數
reportWebVitals();
