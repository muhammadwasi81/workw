import React from 'react';
import "./call.css"
import {BottomView, MainFooter, MainOptionView} from "./KonnectCall.style"
import {CallLabel} from "./CallLabel";
import {CallMainOptions, CallOtherOptions} from "./CallOptions";

export function BottomContainer() {
    return (
        <BottomView>
            <MainOptionView/>
            <MainFooter>
                <CallLabel/>
                <CallMainOptions/>
                <CallOtherOptions/>
            </MainFooter>
        </BottomView>
    )
}