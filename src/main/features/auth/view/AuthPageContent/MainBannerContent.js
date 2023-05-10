import React from "react";
import LearnTextIcon from "../../../../../content/png/signin/learn-text-icon.png";
import arrowDropRight from "../../../../../content/png/signin/arrow-dropright-circle.png";
import systemLogo from "../../../../../content/systemLogo.png";
import btnLeftIcon from "../../../landingpage/icons/btn-left.png";

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
      <button class="bg-primary-color text-white font-bold py-2 px-4 flex items-center justify-center my-5 p-3 rounded-lg">
        <img src={btnLeftIcon} alt="Left" class="h-8 w-8 inline-block mr-2" />
        <div className="">
          Click Here <br />
          <span className="text-[#A8BEC4] learn__more">
            Learn more about Workwise.
          </span>
        </div>
        <img
          src={arrowDropRight}
          alt="Right"
          class="h-6 w-6 inline-block ml-2"
        />
      </button>
      <div className="text-xs">
        &copy; Workwise Ltd - Copyrights @2017-{new Date().getFullYear()}
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
