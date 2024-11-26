import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import '../styles/ChatPage.css';  // Створіть цей файл стилів

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMessages = [
            ...messages,
            { text: inputMessage, sender: 'user' }
        ];
        setMessages(newMessages);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Налаштуйте базовий URL відповідно до вашого бекенду
            const response = await axios.post('http://127.0.0.1:8000/api/chat/', {
                message: inputMessage
            });

            setMessages(prevMessages => [
                ...prevMessages,
                { text: response.data.response, sender: 'ai' }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { text: 'Помилка з\'єднання. Спробуйте знову.', sender: 'ai' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender}`}
                    >
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="message ai loading">
                        Друкую...
                    </div>
                )}
            </div>
            <div className="chat-input">
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Напишіть повідомлення..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSendMessage}
                    disabled={isLoading}
                >
                    Надіслати
                </Button>
            </div>
        </div>
    );
};

export default ChatPage;