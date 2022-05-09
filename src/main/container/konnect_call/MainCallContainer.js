import React from 'react';
import "./call.css"
import {MainCallView} from "./KonnectCall.style"
import {CallContainer} from "./CallContainer"

export function MainCallContainer() {
    const callViews = [0];
    const maxColumns = callViews.length <= 2 ? callViews.length : Math.ceil(callViews.length / 2)
    return (
        <MainCallView col={maxColumns}>
            {callViews.map(() => (
                <CallContainer/>
            ))}
        </MainCallView>
    )
}