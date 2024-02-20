import React, { useState } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

interface ChatRoomProps {
    onLogout: () => void;
}

interface Message {
    id: number;
    content: string;
    username: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ onLogout }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleNewMessage = (newMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    return (
        <div>
            <h2>聊天室</h2>
            <MessageList messages={messages} />
            <SendMessageForm onSendMessage={handleNewMessage} />
            <button onClick={onLogout}>登出</button>
        </div>
    );
};

export default ChatRoom;
