import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Button, TextField, Container, Typography, MenuItem, Select } from '@mui/material';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, email, password, role);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" />
                <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
                <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
                <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth margin="normal">
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="organizer">Organizer</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary">Register</Button>
            </form>
        </Container>
    );
};

export default Register;
