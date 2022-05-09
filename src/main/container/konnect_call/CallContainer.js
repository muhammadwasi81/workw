import React from 'react';
import "./call.css"
import {CallView} from "./KonnectCall.style"
import {CallVideoContainer} from "./CallVideoContainer"

export function CallContainer() {
    return (
        <CallView className="callview">
            <CallVideoContainer/>
        </CallView>
    )
}