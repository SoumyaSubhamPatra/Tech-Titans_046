import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { List, ListItem, TextField, Button, Container } from '@mui/material';

const socket = io('http://localhost:8080', { transports: ['websocket'] });

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.emit('joinRoom', { roomId });

        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off(); 
        };
    }, [roomId]);

    const sendMessage = (event) => {
        event.preventDefault();
        setMessage(event.target.value); 
        socket.emit('sendMessage', { roomId, message });

        console.log(message);
        
    };

    return (
        <Container>
            <List>
                {messages.forEach((msg, index) => (
                    <ListItem >{msg}</ListItem>
                ))}
            </List>
            <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <Button onClick={sendMessage} variant="contained" color="primary">
                Send
            </Button>
        </Container>
    );
};

export default Chat;