import React from "react";
import "./style.css";
import Logo from "./konnect.png";

const Spinner = ({isHeight}) => {
    return (
        <div className="main fadeOut" style={{height: isHeight && "unset"}}>
            <div className="loader mySpinner"  >
                <div className="child">
                    <img alt="" src={Logo} className="myImg" />
                </div>
            </div>
        </div>
    )
}
export default Spinner;