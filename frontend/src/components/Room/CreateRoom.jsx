import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

const CreateRoom = () => {
    const { token } = useContext(AuthContext);
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.post('/api/room/create', { name }, config);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Create Room</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Room Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </Container>
    );
};

export default CreateRoom;
