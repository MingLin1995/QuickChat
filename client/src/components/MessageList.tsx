// src/components/MessageList.tsx

import React from 'react';

// 定義組件屬性的介面
interface MessageListProps {
    messages: Message[]; // messages 屬性是一個 Message 結構的陣列
}

// 定義聊天訊息的結構
interface Message {
    id: number;
    content: string;
    username: string;
}

// 定義 MessageList 組件，接受一個名為 MessageListProps 的屬性物件，並解構取出 messages 屬性
const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div>
            {messages.map(message => (
                <div key={message.id}> {/* 具有唯一的 key 屬性 */}
                    <p>{message.username}：{message.content}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
