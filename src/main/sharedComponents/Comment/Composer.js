import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { isValidFileSize } from "../../../utils/base";
import { DEFAULT_GUID } from "../../../utils/constants";
import Avatar from "../Avatar/avatarOLD";
import closeIcon from "./assets/close.svg";
import { postComment } from "./services";
import "./style.css";

const CommentComposer = (props) => {
  const {
    userSlice: { user },
  } = useSelector((state) => state);
  let {
    isAttachment = true,
    id = DEFAULT_GUID,
    referenceId = DEFAULT_GUID,
    parentId = DEFAULT_GUID,
    module = 1,
    afterSuccess,
  } = props;
  const commentText = useRef();
  const { name, userImage } = user;

  const defaultState = {
    hasAttachment: false,
    attachmentFile: null,
    attachmentName: "",
    attachmentPath: "",
    commentText: "",
  };
  const [state, setState] = useState(defaultState);
  const handleCommentImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const validFile = isValidFileSize(e.target.files);
      if (validFile.status) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = (data) =>
          setState({
            ...state,
            hasAttachment: true,
            attachmentPath: data.target.result,
            attachmentFile: file,
          });
        reader.readAsDataURL(file);
      } else {
        alert(validFile.message);
      }
    }
  };
  const deleteAttachment = () => {
    setState({
      ...state,
      hasAttachment: false,
      attachmentPath: "",
      attachmentFile: null,
    });
  };
  const commentObj = {
    id,
    module,
    referenceId,
    parentId,
    comment: state.commentText,
    attachments: [],
    mentions: [],
  };
  const saveComment = async (event) => {
    if (event.keyCode == 13 || event.which == 13) {
      event.preventDefault();
      if (state.commentText.length > 0) {
        commentText.current.blur();
        const response = await postComment(commentObj);
        const prevText = state.commentText;
        setState((preValue) => ({
          ...preValue,
          commentText: "",
        }));
        if (response) {
          afterSuccess && afterSuccess(response);
        } else {
          setState((preValue) => ({
            ...preValue,
            commentText: prevText,
          }));
        }
      }
    }
  };
  return (
    <div className="commentComposer">
      <div className="img">
        <Avatar
          name={name}
          width={33}
          height={33}
          round={true}
          src={userImage}
        />
      </div>
      {/* onCommentSend({comment:state.commentText, attachmentFile : state.attachmentFile}) */}
      <div className="composer-area">
        <form className="inputs">
          <div className="inp">
            <textarea
              type={"text"}
              ref={commentText}
              onChange={(event) => {
                setState((preValue) => ({
                  ...preValue,
                  commentText: event.target.value,
                }));
              }}
              placeholder="Write Your Comments Here."
              style={{ height: "20px" }}
              value={state.commentText}
              onKeyPress={(event) => saveComment(event)}
            />
          </div>

          {isAttachment && (
            <div className="capture">
              <input
                accept=".jpg, .jpeg, .gif, .bmp, .png, .mp4"
                type="file"
                onChange={handleCommentImageChange}
              />
            </div>
          )}
        </form>
        {state.hasAttachment ? (
          <div className="attach-select-area">
            {
              <div
                className="attach"
                title={state.attachmentName}
                style={{
                  backgroundImage: `url("${state.attachmentPath}")`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              >
                <div className="overlay">
                  <span>{state.attachmentName}</span>
                </div>
                <div className="cut" onClick={deleteAttachment}>
                  <img src={closeIcon} alt="#" />
                </div>
              </div>
            }
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default CommentComposer;
