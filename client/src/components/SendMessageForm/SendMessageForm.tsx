// src/components/SendMessageForm.tsx

import React, { useState } from 'react';
import './SendMessageForm.css';

// 定義組件屬性的介面
interface SendMessageFormProps {
    onSendMessage: (message: { id: number; content: string; username: string }) => void;
}

// 定義 SendMessageForm 組件，接受一個名為 SendMessageFormProps 的屬性物件，並解構取出 onSendMessage 屬性
const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSendMessage }) => {
    // 定義狀態 message ，用於儲存輸入的訊息內容，初始值為空字串
    const [message, setMessage] = useState('');

    // 處理表單提交
    const handleSubmit = async (e: React.FormEvent) => { //表單事件物件
        e.preventDefault();

        const nickname = localStorage.getItem("chat-nickname");

        const messageData = {
            content: message,
            username: nickname,
        };

        try {
            const response = await fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (!response.ok) {
                throw new Error('訊息發送失敗');
            }

            const responseData = await response.json();

            // 調用父組件傳遞的 onSendMessage 函數，將新訊息傳遞給父組件(同步更新父組建，確保即時顯示最新畫面)
            onSendMessage({
                id: responseData.id,
                content: responseData.content,
                username: responseData.username
            });

            setMessage(''); // 清空輸入框
        } catch (error) {
            console.error(error);
        }
    };

    return (
        // 表單元素，當提交時調用 handleSubmit 函數
        <form onSubmit={handleSubmit} className="sendMessageForm">
            {/* 輸入框，value 綁定到狀態 message，onChange 事件處理函數更新狀態 */}
            <input
                className="sendMessageInput"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="請輸入訊息"
            />
            <button className="sendMessageButton" type="submit">發送</button>
        </form>
    );
};

export default SendMessageForm;
