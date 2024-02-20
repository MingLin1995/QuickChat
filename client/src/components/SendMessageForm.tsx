// src/components/SendMessageForm.tsx

import React, { useState } from 'react';

interface SendMessageFormProps {
    onSendMessage: (message: { id: number; content: string; username: string }) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="輸入消息..."
            />
            <button type="submit">發送</button>
        </form>
    );
};

export default SendMessageForm;
