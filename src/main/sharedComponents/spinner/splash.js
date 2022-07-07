import React from "react";
import "./style.css";
import Logo from "./konnect.png";

const Splash = () => {
    return (
        <div className="main fadeOut">
            <div className="loader splash"  >
                <div className="child">
                    <img alt="" src={Logo} className="myImg" style={{ width: "80px" }} />
                </div>
            </div>
        </div>
    )
}
export default Splash;