import React from 'react';
import {useParams} from 'react-router-dom';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
const Room = () => {

    const {roomId} = useParams();

    const myMeeting = async(element) => {
        const appID = 1617194788;
        const serverSecret = "c75f982ad344c28a4fbb4301228bac57";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), 'Suraj' );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
             mode: ZegoUIKitPrebuilt.VideoConference,
            },
       });

    }
  return (
    <div>
      <div ref={myMeeting}/>
    </div>
  )
}

export default Room
