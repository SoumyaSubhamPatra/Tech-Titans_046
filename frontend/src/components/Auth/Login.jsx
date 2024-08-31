import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button, TextField, Container, Typography, Alert } from "@mui/material";
import "../Auth/Login.css"; // Import the CSS file

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      setAlert({ type: "success", message: "Login successful!" });
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/create-room");
        } else {
          navigate("/join-room");
        }
      }, 2000);
    } catch (error) {
      setAlert({
        type: "error",
        message: "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom className="title">
        Login
      </Typography>
      {alert && (
        <Alert severity={alert.type} className="alert">
          {alert.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          className="textField"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          className="textField"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="button"
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" className="link">
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Container>
  );
};

export default Login;
