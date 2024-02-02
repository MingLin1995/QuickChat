// src/components/Nickname.tsx
import React, { useState, useEffect } from "react";

const Nickname = () => {
  const [nickname, setNickname] = useState<string>("");
  const [storedNickname, setStoredNickname] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 如果已經設定過暱稱，就加載現有暱稱
  useEffect(() => {
    const savedNickname = localStorage.getItem("chat-nickname");
    if (savedNickname) {
      setStoredNickname(savedNickname);
    }
  }, []);

  // 處理輸入框的變化
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 處理暱稱提交的部分
  const handleNicknameSubmit = async () => {
    setError(""); // 每次提交前清空錯誤訊息

    try {
      // 檢查暱稱是否存在
      const checkResponse = await fetch(`/api/nicknames/${nickname}`);
      if (!checkResponse.ok) {
        throw new Error(`檢查暱稱錯誤: ${checkResponse.status}`);
      }
      const result = await checkResponse.json();
      if (!result.isValid) {
        throw new Error('暱稱已被使用，請使用其他暱稱');
      }

      // 將暱稱儲存至 localStorage
      localStorage.setItem("chat-nickname", nickname);
      setStoredNickname(nickname);

      // 將暱稱儲存到資料庫
      const response = await fetch("/api/nicknames/", {
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
      console.log("暱稱儲存到資料庫:", data);
    } catch (error) {
      const message = error instanceof Error ? error.message : '發生未預期的錯誤';
      setError(message);  // 設定錯誤訊息
      setNickname("")
      console.error("Error:", error);
    }
  };


  // 處理登出
  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/nicknames/${storedNickname}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`登出失敗: ${response.status}`);
      }
      console.log('登出成功');
      // 清除 localStorage 中的暱稱
      localStorage.removeItem("chat-nickname");
      setStoredNickname("");
      setNickname("")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {storedNickname ? (
        <div>
          <p>歡迎, {storedNickname}</p>
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="請輸入暱稱"
          />
          <button onClick={handleNicknameSubmit}>開始</button>
          {error && <p className="error">{error}</p>} {/* 顯示錯誤信息 */}
        </div>
      )}
    </div>
  );
};

export default Nickname;
