import React from 'react';
import ReactPlayer from 'react-player';
import { Container } from '@mui/material';

const VideoPlayer = ({ videoLink }) => {
    return (
        <Container>
            <ReactPlayer url={videoLink} controls width="100%" />
        </Container>
    );
};

export default VideoPlayer;
