// src/components/ChatRoom.tsx

import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

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

    return (
        <div>
            <h2>聊天室</h2>
            {/* 接收 MessageListProps 指定的 messages 屬性 */}
            <MessageList messages={messageList} />
            {/* 接收 SendMessageFormProps 指定的 onSendMessage 屬性 */}
            <SendMessageForm onSendMessage={handleNewMessage} />
            <button onClick={onLogout}>登出</button>
        </div>
    );
};

export default ChatRoom;
