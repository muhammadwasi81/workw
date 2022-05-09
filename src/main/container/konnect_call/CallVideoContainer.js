import React, {useState, useRef, useEffect} from 'react';
import "./call.css"
import {CallVideoView} from "./KonnectCall.style"

export function CallVideoContainer() {

    const [stream, updateStream] = useState(null);
    const videoElement = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
            updateStream(stream);
        }).catch(() => {
            updateStream(null);
        })
    }, [videoElement]);

    useEffect(() => {
        videoElement.current.srcObject = stream;
    }, [stream])

    return (
        <CallVideoView>
            <video ref={videoElement} className="videoview" autoPlay/>
        </CallVideoView>
    )
}