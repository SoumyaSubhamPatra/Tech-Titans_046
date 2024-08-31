import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import VideoPlayer from '../VideoPlayer';
import Chat from '../Chat';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

const Room = ({ roomId }) => {
    const { token, user } = useContext(AuthContext);
    const [room, setRoom] = useState(null);
    const [link, setLink] = useState('');

    useEffect(() => {
        const fetchRoom = async () => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`/api/room/${roomId}`, config);
            setRoom(res.data);
        };

        fetchRoom();
    }, [roomId, token]);

    const handleWatch = async () => {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.post(`/api/room/watch`, { roomId, link }, config);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Room: {room?.name}</Typography>
            {user.role === 'admin' && (
                <form onSubmit={handleWatch}>
                    <TextField label="Video Link" fullWidth value={link} onChange={(e) => setLink(e.target.value)} margin="normal" />
                    <Button type="submit" variant="contained" color="primary">Watch</Button>
                </form>
            )}
            {room?.videoLink && <VideoPlayer videoLink={room.videoLink} />}
            <Chat roomId={roomId} />
        </Container>
    );
};

export default Room;
