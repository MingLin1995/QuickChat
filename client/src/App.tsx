import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // 當組件掛載後發起請求
    fetch('http://localhost:3000/api/greeting')
      .then(response => response.text())
      .then(data => {
        setGreeting(data); // 將後端回傳的訊息設定到狀態中
      })
      .catch(error => {
        console.error('There was an error fetching the greeting:', error);
      });
  }, []); // 空依賴數組表示這個效果只在組件掛載時運行一次

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {greeting} {/* 顯示從後端獲取的問候訊息 */}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
