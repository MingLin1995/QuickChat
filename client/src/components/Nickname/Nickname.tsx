// src/components/Nickname.tsx
import React, { useState, useEffect } from "react";
import './Nickname.css';

interface NicknameProps {
  onNicknameSet: (nickname: string) => void; // 接受一個字符串參數並且不返回任何值的函數
}

// 定義暱稱組件，接受一個名為NicknameProps的屬性物件，並解構取出onNicknameSet屬性
const Nickname: React.FC<NicknameProps> = ({ onNicknameSet }) => {
  const [nickname, setNickname] = useState<string>(""); // 定義狀態 nickname ，初始值為空字符串 (輸入匡的)
  const [storedNickname, setStoredNickname] = useState<string>(""); // 定義狀態 storedNickname ，初始值為空字符串 (儲存本地已儲存的暱稱)
  const [error, setError] = useState<string>("");  // 定義狀態 error ，初始值為空字符串


  // 如果已經設定過暱稱，就加載現有暱稱
  useEffect(() => {
    const savedNickname = localStorage.getItem("chat-nickname");
    if (savedNickname) {
      setStoredNickname(savedNickname);
    }
  }, []);

  // 處理輸入框的變化
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value); // e.target.value 表示輸入框的新值，將輸入框的值設置為 nickname 狀態
  };

  // 處理暱稱提交的部分
  const handleNicknameSubmit = async () => {
    setError(""); // 每次提交前清空錯誤訊息

    try {
      // 檢查暱稱是否存在
      const checkResponse = await fetch(`/nicknames/${nickname}`);
      if (!checkResponse.ok) {
        throw new Error(`檢查暱稱錯誤: ${checkResponse.status}`);
      }
      const result = await checkResponse.json();
      if (!result.isValid) {
        throw new Error('暱稱已被使用，請使用其他暱稱');
      }

      localStorage.setItem("chat-nickname", nickname);
      setStoredNickname(nickname); // 設置storedNickname狀態為nickname
      onNicknameSet(nickname); // 呼叫父組件傳遞的 onNicknameSet 函數，將 nickname 傳遞給父組件

      // 將暱稱儲存到資料庫
      const response = await fetch("/nicknames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nickname }),
      });

      if (!response.ok) {
        throw new Error(`儲存暱稱失敗: ${response.status}`);
      }

      const data = await response.json();
      //console.log("暱稱儲存到資料庫:", data);
    } catch (error) {
      const message = error instanceof Error ? error.message : '發生未預期的錯誤';
      setError(message);  // 設定錯誤訊息
      setNickname("")
      //console.error("Error:", error);
    }
  };

  return (
    <div className="nicknameContainer">
      <input
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        placeholder="請輸入暱稱"
        className="nicknameInput"
      />
      <button onClick={handleNicknameSubmit} className="nicknameButton">開始</button>
      {error && <div className="error">{error}</div>} {/* 顯示錯誤訊息 */}
    </div>

  );
};

export default Nickname;
