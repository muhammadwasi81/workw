import React from "react";
import { Tooltip } from "../SharedComponentBridge";
import './index.css'

export default function AntTooltip(props) {
    return (
        <Tooltip title={props.value} placement={props.placement} color={props.color}>
            <span>{props.children}</span>
        </Tooltip>
    )
}