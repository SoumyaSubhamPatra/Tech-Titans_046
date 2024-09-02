import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import AuthContext from '../../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/login'); // Redirect to the login page
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
