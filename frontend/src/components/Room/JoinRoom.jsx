import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";
import LogoutButton from "../Auth/LogoutButton";
import "../Room/JoinRoom.css";

const JoinRoom = () => {
  const { token } = useContext(AuthContext);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(
        "http://localhost:8080/api/room/join",
        { roomId },
        config
      );
      navigate(`/room/${roomId}`); // Redirect to the room after successful join
    } catch (error) {
      console.error("Failed to join room:", error);
      // Optionally, handle the error, e.g., show an alert or message
    }
  };

  return (
    <Container>
      <LogoutButton />
      <Typography variant="h4" gutterBottom>
        Join Room
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Room ID"
          fullWidth
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>
    </Container>
  );
};

export default JoinRoom;
