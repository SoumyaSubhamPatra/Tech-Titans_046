Watch Video Together
Introduction
Watch Video Together is a web application that allows users to create or join virtual rooms where they can watch YouTube videos in perfect synchronization with friends and chat in real-time. This project was created to enhance online social interactions by providing a platform where people can share video-watching experiences, even when they are physically apart.

Project Goal
The goal of this project is to create an engaging, user-friendly platform where multiple users can join a room, watch YouTube videos together, and communicate via real-time chat. Advanced features like real-time reactions, customizable avatars, and a voting system for the next video enhance user engagement.

Features
Core Features
User Authentication

Users can sign up, log in, and log out securely using JWT tokens.
Room Creation and Joining

Users can create a room with a unique identifier and share the link for others to join.
Users can join an existing room using the shared link.
YouTube Video Sync

Users can paste a YouTube video link, and the video will be played in sync across all users in the room.
Play, pause, and seek actions by any user are reflected for all users in real-time.
Real-Time Chat

Users can chat with each other in real-time while watching the video.
The chat is displayed alongside the video player.
User Presence

A list of users currently in the room is displayed.
Moderation Tools

The room creator (host) can kick users out and control video playback.
Advanced Features
Reactions and Emojis

Users can send real-time reactions and emojis that appear on the screen.
Customizable Avatars

Users can create or upload avatars to represent them in the chat.
Voting System for Next Video

Users can suggest and vote for the next YouTube video to watch.
Video Timestamp Comments

Users can leave comments tied to specific timestamps in the video.
Screen Sharing

The host can share their screen instead of a YouTube video.
Notification System

Users receive notifications for new messages, users joining or leaving, and other important events.
Technology Stack
Frontend: React.js, Redux (or Context API), CSS/SCSS
Backend: Node.js, Express.js
Database: MongoDB
Real-Time Functionality: Socket.IO
Authentication: JWT (JSON Web Tokens)
Deployment: Vercel (Frontend), Heroku or AWS (Backend)
Installation and Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/watch-video-together.git
cd watch-video-together
Install Dependencies:

For frontend:
bash
Copy code
cd frontend
npm install
For backend:
bash
Copy code
cd backend
npm install
Environment Variables:

Create a .env file in the backend directory and add the following:
makefile
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=your_server_port
Run the Application:

Start the backend server:
bash
Copy code
cd backend
npm start
Start the frontend development server:
bash
Copy code
cd frontend
npm start
Access the Application:

Open your browser and go to http://localhost:3000 to access the application.
Project Structure
frontend/: Contains the React.js code for the client-side application.
backend/: Contains the Node.js and Express.js code for the server-side application.
README.md: Documentation of the project.
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.
Feedback
We value your feedback and suggestions! Please open an issue if you have any feedback, suggestions, or bug reports. We appreciate your input in helping us improve the project!

