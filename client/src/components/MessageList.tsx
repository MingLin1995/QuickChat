// src/components/MessageList.tsx

import React from 'react';

interface Message {
    id: number;
    content: string;
    username: string;
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div>
            {messages.map(message => (
                <div key={message.id}>
                    <p>{message.username}：{message.content}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
