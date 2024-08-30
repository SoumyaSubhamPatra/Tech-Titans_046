import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Home = () => {

    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = (e) =>{
        e.preventDeafult();
        navigate(`/room/${roomCode}`);
    }
  return (
    <div className='home-page'>
        <from onSubmit={handleFormSubmit} >
            <div>
                <label style={{fontSize:'2rem'}}><b>Enter Room Code:</b></label><br /><br/>
                <input type='text' placeholder='Enter Room code' style={{width:'40rem',height:'2rem'}}/><br /><br />
                <button type='submit' style={{width:'20rem',height:'2rem'}}>Enter Code</button>
            </div>
        </from>
    </div>
  )
}

export default Home;
