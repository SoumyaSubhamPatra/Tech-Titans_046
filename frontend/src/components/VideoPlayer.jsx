import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Container } from '@mui/material';
import io from 'socket.io-client';

let socket;

const VideoPlayer = ({ videoLink, onPlay, onPause }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        // Initialize Socket.io connection
        socket = io('http://localhost:8080');

        // Listen for video control events (play/pause) from other users
        socket.on('video-control', (action) => {
            console.log(`Received action: ${action}`); // For debugging

            const player = playerRef.current;

            if (player) {
                if (action === 'play') {
                    player.seekTo(player.getCurrentTime());
                    player.getInternalPlayer().play().catch((error) => {
                        console.error('Failed to play the video:', error);
                    });
                } else if (action === 'pause') {
                    player.getInternalPlayer().pause();
                }
            }
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const handlePlay = () => {
        socket.emit('video-control', 'play');
        if (onPlay) onPlay();
    };

    const handlePause = () => {
        socket.emit('video-control', 'pause');
        if (onPause) onPause();
    };

    return (
        <Container>
            <ReactPlayer
                ref={playerRef}
                url={videoLink}
                controls
                width="100%"
                height="auto"
                onPlay={handlePlay}  // Emit play event
                onPause={handlePause}  // Emit pause event
            />
        </Container>
    );
};

export default VideoPlayer;
