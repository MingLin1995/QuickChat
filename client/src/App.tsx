// import React, { useEffect, useState } from 'react'; // 匯入React庫以及useEffect和useState鉤子

// import logo from './logo.svg'; // 匯入logo圖像
import './App.css'; // 匯入App組件的CSS樣式
import Nickname from './components/Nickname'; // 匯入Nickname組件

function App() {

  // //const [這是當前狀態的變數，可以從中讀取當前狀態的值, 這是一個函數，用於更新狀態的值] = useState(狀態的初始值);
  // const [greeting, setGreeting] = useState(''); // 使用useState鉤子定義一個狀態變數greeting

  // useEffect(() => {
  //   // 使用useEffect鉤子來處理副作用（例如數據讀取、網絡請求、DOM操作等。）
  //   fetch('http://localhost:3000/api/greeting')
  //     .then(response => response.text()) 
  //     .then(data => {
  //       setGreeting(data); // 將後端回傳的訊息設定到greeting狀態中
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the greeting:', error); 
  //     });
  // }, []); // 空依賴數組表示這個效果只在組件掛載時運行一次


  return (
    <div className="App"> {/* 定義組件的根元素，並添加CSS類名App */}
      <header className="App-header"> {/* 定義頁面的頭部區域，並添加CSS類名App-header */}
        {/* 渲染Nickname組件 */}
        <Nickname />
        {/* 聊天室的其他內容可以在這裡添加 */}
      </header>
    </div>
  );

  // return (
  //   <div className="App"> {/* 定義組件的根元素，並添加CSS類名App */}
  //     <header className="App-header"> {/* 定義頁面的頭部區域，並添加CSS類名App-header */}
  //       <img src={logo} className="App-logo" alt="logo" /> {/* 顯示logo圖像 */}
  //       <p>
  //         {greeting} {/* 顯示從後端獲取的問候訊息，使用greeting狀態的值 */}
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App; // 導出App組件以供其他模組使用
