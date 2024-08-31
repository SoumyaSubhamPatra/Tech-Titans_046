import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

const JoinRoom = () => {
    const { token } = useContext(AuthContext);
    const [roomId, setRoomId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.post('/api/room/join', { roomId }, config);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Join Room</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Room ID" fullWidth value={roomId} onChange={(e) => setRoomId(e.target.value)} margin="normal" />
                <Button type="submit" variant="contained" color="primary">Join</Button>
            </form>
        </Container>
    );
};

export default JoinRoom;
