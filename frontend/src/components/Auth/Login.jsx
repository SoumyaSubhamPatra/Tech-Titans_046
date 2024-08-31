import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Button, TextField, Container, Typography, Alert } from '@mui/material';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            setAlert({ type: 'success', message: 'Login successful!' });
            setTimeout(() => {
                if (user.role === 'admin') {
                    navigate('/create-room');
                } else {
                    navigate('/join-room');
                }
            }, 2000); // Redirect to appropriate page after 2 seconds
        } catch (error) {
            setAlert({ type: 'error', message: 'Login failed. Please check your credentials.' });
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Login</Typography>
            {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
            <form onSubmit={handleSubmit}>
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
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </Typography>
        </Container>
    );
};

export default Login;
