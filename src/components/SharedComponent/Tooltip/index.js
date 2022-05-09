import React, {useState} from "react";
import './index.css'

export default function Tooltip(props) {
    const [tt_text] = useState(props.text)
    return (
        <div className="Tooltip-bx" style={{left: `${props.left}`, top: `${props.top}`}}>
            <div className="tooltiptext">
                {tt_text}
            </div>
        </div>
    )
}