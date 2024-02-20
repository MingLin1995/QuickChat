// src/App.tsx 
import React, { useState, useEffect } from 'react';
import './App.css';
import Nickname from './components/Nickname';
import ChatRoom from './components/ChatRoom';

function App() {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // 檢查 localStorage 是否存在用戶的暱稱
    const storedNickname = localStorage.getItem('chat-nickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  const handleNicknameSet = (nickname: string) => {
    setNickname(nickname);
  };

  // 處理登出
  const handleLogout = async () => {
    try {
      const response = await fetch(`/nicknames/${nickname}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`登出失敗: ${response.status}`);
      }
      console.log('登出成功，伺服器端資源已清理');
      // 清空暱稱並清除 localStorage 中的暱稱
      setNickname('');
      localStorage.removeItem('chat-nickname');
    } catch (error) {
      console.error('登出錯誤:', error);
    }

  };


  return (
    <div className="App">
      <header className="App-header">
        {nickname ? (
          <>
            <ChatRoom onLogout={handleLogout} />
          </>
        ) : (
          <Nickname onNicknameSet={handleNicknameSet} />
        )}
      </header>
    </div>
  );
}

export default App;
