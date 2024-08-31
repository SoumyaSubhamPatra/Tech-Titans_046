import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Button, TextField, Container, Typography, MenuItem, Select, Alert } from '@mui/material';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password, role);
            setAlert({ type: 'success', message: 'Registration successful!' });
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect to login after 2 seconds
        } catch (error) {
            setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Register</Typography>
            {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Username" 
                    fullWidth 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    margin="normal" 
                />
                <TextField 
                    label="Email" 
                    fullWidth 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    margin="normal" 
                />
                <TextField 
                    label="Password" 
                    type="password" 
                    fullWidth 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    margin="normal" 
                />
                <Select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    fullWidth 
                    margin="normal"
                >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="organizer">Organizer</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary">Register</Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </Typography>
        </Container>
    );
};

export default Register;
