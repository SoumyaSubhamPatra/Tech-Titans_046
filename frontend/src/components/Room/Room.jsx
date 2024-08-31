import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import VideoPlayer from '../VideoPlayer';
import Chat from '../Chat';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

const Room = () => {
    const { token, user } = useContext(AuthContext);
    const { roomId } = useParams(); // Extract roomId from URL params
    const [room, setRoom] = useState(null);
    const [link, setLink] = useState('');
    console.log(roomId);
    useEffect(() => {
        const fetchRoom = async () => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const res = await axios.get(`http://localhost:8080/api/room/${roomId}`, config);
                console.log(res.data);
                setRoom(res.data);
            } catch (error) {
                console.error('Failed to fetch room:', error);
                // Handle the error accordingly
            }
        };

        fetchRoom();
    }, [roomId, token]);

    const handleWatch = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.post('http://localhost:8080/api/room/watch', { roomId, link }, config);
            // Optionally, handle success or display a message
        } catch (error) {
            console.error('Failed to watch video:', error);
            // Handle the error accordingly
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Room: {room?.name}</Typography>
            {/* romm.[part] map(for each in get req)- data each user  */}
            {user.role === 'admin' && (
                <form onSubmit={handleWatch}>
                    <TextField 
                        label="Video Link" 
                        fullWidth 
                        value={link} 
                        onChange={(e) => setLink(e.target.value)} 
                        margin="normal" 
                    />
                    <Button type="submit" variant="contained" color="primary">Watch</Button>
                </form>
            )}
            {room?.videoLink && <VideoPlayer videoLink={room.videoLink} />}
            <Chat roomId={roomId} />
        </Container>
    );
};

export default Room;
