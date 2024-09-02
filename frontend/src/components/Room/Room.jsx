import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import AuthContext from "../../context/AuthContext";
import VideoPlayer from "../VideoPlayer";
import Chat from "../Chat";
import axios from "axios";
import { Button, TextField, Container, Typography } from "@mui/material";
import LogoutButton from "../Auth/LogoutButton";
import "../Room/Room.css"; // Import the CSS file

let socket;

const Room = () => {
  const { token, user } = useContext(AuthContext);
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const res = await axios.get(
          `http://localhost:8080/api/room/${roomId}`,
          config
        );
        setRoom(res.data);
      } catch (error) {
        console.error("Failed to fetch room:", error);
      }
    };

    fetchRoom();

    // Initialize Socket.io connection
    socket = io("http://localhost:8080");
    socket.emit("joinRoom", { roomId, userId: user.id });

    // Listen for new video link updates
    socket.on("new-video", (videoLink) => {
      setRoom((prevRoom) => ({ ...prevRoom, videoLink }));
    });

    // Listen for video control actions
    socket.on("video-control", (action) => {
      handleVideoControlFromServer(action);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [roomId, token, user.id]);

  const handleWatch = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        "Content-Type": "application/json", // Set content type (if needed)
      },
    };

    const data = {
      roomId,
      link,
      role: user.role, // Include the role in the request body (if needed by your backend)
    };

    try {
      await axios.post("http://localhost:8080/api/video/link", data, config);
      console.log("Video link submitted successfully");
      // After successfully submitting the video link, clear the input field
      setLink("");
    } catch (error) {
      console.log("Failed to watch video:", error);
    }
  };

  const handleVideoControl = (action) => {
    socket.emit("video-control", { roomId, action }); // Emit action to server
  };

  const handleVideoControlFromServer = (action) => {
    // Implement how the video player should respond to the play/pause action
    console.log("Received video control action from server:", action);
    const videoElement = document.getElementById("video-player");
    if (videoElement) {
      if (action === "play") {
        videoElement.play();
      } else if (action === "pause") {
        videoElement.pause();
      }
    }
  };

  return (
    <Container className="container">
      <LogoutButton />
      <Typography variant="h4" gutterBottom>
        Room: {room?.name}
      </Typography>
      {user.role === "admin" && (
        <form onSubmit={handleWatch}>
          <TextField
            label="Video Link"
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
            margin="normal"
            className="textField"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="button"
          >
            Watch
          </Button>
        </form>
      )}
      {room?.videoLink && (
        <VideoPlayer
          id="video-player"
          videoLink={room.videoLink}
          onPlay={() => handleVideoControl("play")}
          onPause={() => handleVideoControl("pause")}
          className="videoPlayer"
        />
      )}
      <div className="chatContainer">
        <Chat roomId={roomId} />
      </div>
    </Container>
  );
};

export default Room;
