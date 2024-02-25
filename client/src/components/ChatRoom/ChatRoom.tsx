// src/components/ChatRoom.tsx

import React, { useState, useEffect } from 'react';
import MessageList from '../MessageList/MessageList';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import './ChatRoom.css';

// 定義組建屬性的介面
interface ChatRoomProps {
    onLogout: () => void; // onLogout 屬性為一個不接受任何參數、沒有返回值的函數
}

// 定義聊天訊息的結構
interface Message {
    id: number;
    content: string;
    username: string;
}

// 定義 ChatRoom 組件，接受一個名為ChatRoomProps的屬性物件，並解構取出 onLogout 屬性
const ChatRoom: React.FC<ChatRoomProps> = ({ onLogout }) => {
    // 定義狀態 messages ，用於存儲聊天室的訊息，初始值為一個空陣列
    const [messageList, setMessageList] = useState<Message[]>([]);

    // 處理存在伺服器內的訊息
    useEffect(() => {
        fetch('/messages')
            .then(response => response.json())
            .then(data => setMessageList(data))
            .catch(error => console.error('Error fetching messages:', error));
    }, []); // 依賴陣列為空，表示只在組件加載時執行一次

    // 處理新增的訊息，將新訊息添加到當前訊息列表中
    const handleNewMessage = (newMessage: Message) => {
        setMessageList(prevMessageList => [...prevMessageList, newMessage]);
    };

    const handleEditMessage = (message: Message) => {
        const newContent = prompt("請輸入新的訊息內容", message.content);
        if (newContent !== null && newContent !== message.content) {
            // 假設這裡發送一個請求到後端來更新訊息
            fetch(`/messages/${message.id}`, {
                method: 'PUT', // 或 'PATCH'，視後端實珀而定
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newContent }),
            })
                .then(response => response.json())
                .then(updatedMessage => {
                    // 更新成功後，更新前端的訊息列表
                    setMessageList(prevMessageList => prevMessageList.map(msg => msg.id === message.id ? { ...msg, content: newContent } : msg));
                })
                .catch(error => console.error('Error updating message:', error));
        }
    };

    const handleDeleteMessage = (id: number) => {
        fetch(`/messages/${id}`, { method: 'DELETE' })
            .then(() => {
                // 刪除成功後，從 messageList 中移除該留言
                setMessageList(prevMessageList => prevMessageList.filter(message => message.id !== id));
            })
            .catch(error => console.error('Error deleting message:', error));
    };

    return (
        <div className="chatRoomContainer">
            <h2>聊天室</h2>
            {/* 接收 MessageListProps 指定的 messages 屬性 */}
            <MessageList messages={messageList} onEdit={handleEditMessage} onDelete={handleDeleteMessage} />
            {/* 接收 SendMessageFormProps 指定的 onSendMessage 屬性 */}
            <SendMessageForm onSendMessage={handleNewMessage} />
            <button onClick={onLogout}>登出</button>
        </div>
    );
};

export default ChatRoom;
