import React from "react";
import LearnTextIcon from "../../../../../content/png/signin/learn-text-icon.png";
import arrowDropRight from "../../../../../content/png/signin/arrow-dropright-circle.png";
import systemLogo from "../../../../../content/systemLogo.png";

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
				<span className="text-subText">
					Easy – Effective - Efficient
				</span>
			</div>
			{/* 
      <div className="learn-txt-box">
        <div className="LearnTextIcon">
          <img src={LearnTextIcon} alt={"LearnTextIcon"} />
        </div>
        <div className="clickTextBox">
          <div className="clickTextArea">Click Here</div>
          <div className="learnMoreText">learn more about Konnect.</div>
        </div>

        <div
          className="arrowDropRight"
          onClick={() => window.open("https://konnect.im/aboutus/")}
        >
          <img src={arrowDropRight} alt={"arrowDropRight"} />
        </div>
      </div> */}
		</div>
	);
}

export default MainBannerContent;
