import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { Button, TextField, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';

const CreateRoom = () => {
    const { token, user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [joinUrl, setJoinUrl] = useState('');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post('http://localhost:8080/api/room/create', { name }, config);
            const roomId = response.data.roomId; // Assuming the response contains the roomId
            const url = `${window.location.origin}/room/${roomId}`;
            setJoinUrl(url);
            setAlert({ type: 'success', message: 'Room created successfully!' });
        } catch (error) {
            console.error('Failed to create room:', error);
            setAlert({ type: 'error', message: 'Failed to create room. Please try again.' });
        }
    };

    const handleJoinRoom = () => {
        if (user.role === 'admin' && joinUrl) {
            navigate(`/room/${joinUrl.split('/').pop()}`); // Extract roomId from URL and navigate
        }
    };

    return (
        <Container>
            <LogoutButton />
            <Typography variant="h4" gutterBottom>Create Room</Typography>
            {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Room Name" 
                    fullWidth 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    margin="normal" 
                />
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
            {joinUrl && (
                <>
                    <Typography variant="body1" style={{ marginTop: '1rem' }}>
                        Room created! Share this link to join: <a href={joinUrl}>{joinUrl}</a>
                    </Typography>
                    {user.role === 'admin' && (
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginTop: '1rem' }}
                            onClick={handleJoinRoom}
                        >
                            Join Room
                        </Button>
                    )}
                </>
            )}
        </Container>
    );
};

export default CreateRoom;
