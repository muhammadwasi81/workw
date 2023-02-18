import React from "react";
import systemLogo from "../../../../../../content/systemLogo.png";

function MainBannerContent() {
  return (
    <div className="lg-text konnectHeading">
      <div className="system-logo">
        <img src={systemLogo} alt="#" />
      </div>
      <div className="text-head">
        <span className="first-head">Corporate</span>
        <span>Social Solution</span>
      </div>
      <div className="text-sub">
        Work from home the way it should be
        <span className="text-subText">Easy – Effective - Efficient</span>
      </div>
    </div>
  );
}

export default MainBannerContent;
