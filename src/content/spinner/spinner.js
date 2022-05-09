import React from "react";
import "./style.css";
import Logo from "./konnect.png";

const Spinner = () => {
    return (
        <div className="main fadeOut">
            <div className="loader mySpinner"  >
                <div className="child">
                    <img alt="" src={Logo} className="myImg" />
                </div>
            </div>
        </div>
    )
}
export default Spinner;