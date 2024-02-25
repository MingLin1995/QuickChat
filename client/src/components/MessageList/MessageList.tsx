// src/components/MessageList.tsx

import React from 'react';
import './MessageList.css';

// 定義組件屬性的介面
interface MessageListProps {
    messages: Message[]; // messages 屬性是一個 Message 結構的陣列
    onEdit: (message: Message) => void; // 處理編輯操作的函數
    onDelete: (id: number) => void; // 處理刪除操作的函數
}

// 定義聊天訊息的結構
interface Message {
    id: number;
    content: string;
    username: string;
}

// 定義 MessageList 組件，接受一個名為 MessageListProps 的屬性物件，並解構取出 messages, onEdit, onDelete 屬性
const MessageList: React.FC<MessageListProps> = ({ messages, onEdit, onDelete }) => {
    const currentUser = localStorage.getItem("chat-nickname");
    return (
        <div>
            {messages.map((message) => (
                <div key={message.id} className="messageContainer">
                    <p className="messageContent">{message.username}：{message.content}</p>
                    {message.username === currentUser && (
                        <div>
                            <button onClick={() => onEdit(message)} className="editButton">編輯</button>
                            <button onClick={() => onDelete(message.id)} className="deleteButton">刪除</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
