import React from 'react';
import "./call.css"
import {CallMiniContainer} from "./CallMiniContainer";
import {CallBigContainer} from "./CallBigContainer";

export function Main({short = false}) {
    return short ? <CallMiniContainer/> : <CallBigContainer/>
}