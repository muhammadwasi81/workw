import React, { useState } from "react";
import Avatar from "../../../../SharedComponent/Avatar/avatar";
import $ from "jquery";
import penIcon from "../../../../../content/NewContent/NewsFeed/svg/pen.svg";
import chartIcon from "../../../../../content/NewContent/NewsFeed/svg/chart.svg";
import frameIcon from "../../../../../content/NewContent/NewsFeed/svg/image.svg";
import Composer from "../../../../../main/features/feed/composer/index";

const Index = () => {
  const [showComposer, setShowComposer] = useState(false);

  return (
    <>
      <div className={`newsComposer ${false ? "on" : ""}`}>
        <div id="newsComposer" className="composer">
          {/* <div>Whats on your mind?</div> */}

          <div className="user">
            <Avatar
              src={
                "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
              }
              className="addPostAvatar"
              name={"AbuBakar"}
              width={44}
              height={44}
              round={true}
            />
            <div className="name">
              <span>{"AbuBakar"}</span>
              {/* {
                                postTags.length > 0 ? (
                                    <React.Fragment>
                                        &ensp;with&ensp;
                                        <span>{postTags[0].name}</span>
                                        {postTags.length > 1 ? (<React.Fragment>
                                            &ensp;and&ensp;
                                            <span>{postTags.length > 2 ? `${postTags.length - 1} Others` : postTags[1].name}</span>
                                        </React.Fragment>) : ("")}
                                    </React.Fragment>
                                ) : ("")
                            } */}
            </div>
          </div>

          <div className="text-area">
            <label onClick={() => $("#txNewNews").focus()}>
              <textarea
                onClick={() => setShowComposer(true)}
                id="txNewNews"
                placeholder={"What’s on your mind?"}
              />
            </label>
            {/*<div className="smile"><i className="ic-smile" onClick={this.handleEmoticon} /></div>*/}
            {/* {openEmoticons ? <span className="emoticon-cont"><Picker
                            style={{width: 'inherit', bottom: '20px', right: '20px'}}
                            onSelect={this.handleAddEmoji}/></span> : ''} */}
          </div>
          <div className="feedIcons">
            <img src={frameIcon} alt="" />
            <img src={penIcon} alt="" />
            <img src={chartIcon} alt="" />
          </div>
        </div>

        <span className="area-block" />
      </div>
      <Composer show={showComposer} onClose={() => setShowComposer(false)} />
    </>
  );
};

export default Index;
