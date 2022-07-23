import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getMentionsAndText, isValidFileSize } from "../../../utils/base";
import { DEFAULT_GUID } from "../../../utils/constants";
import useDebounce from "../../../utils/Shared/helper/use-debounce";
import { getAllEmployeeService } from "../../../utils/Shared/services/services";
import Avatar from "../Avatar/avatarOLD";
import CustomMentions from "../Mentions";
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
    placeHolder = "Write Your Comments Here.",
  } = props;
  const commentText = useRef();
  const { name, userImage } = user;
  const [mentions, setMentions] = useState([]);
  const [mentionsInTitle, setMentionsInTitle] = useState([]);

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
  const saveComment = async (event) => {
    const { title, mentions } = getMentionsAndText(
      state.commentText,
      mentionsInTitle
    );
    const commentObj = {
      id,
      module,
      referenceId,
      parentId,
      comment: title,
      attachments: [],
      mentions,
    };
    if (event.keyCode == 13 || event.which == 13) {
      event.preventDefault();
      if (state.commentText.length > 0) {
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
  const getempolyeeBySearch = async (search) => {
    if (search.includes("@")) {
      let filter = search.split("@").at(-1);
      const text = filter.replace(/@/g, "");

      const { responseCode, data } = await getAllEmployeeService(text, 1, 20);
      if (responseCode === 1001) setMentions(data);
    }
  };
  const search = useDebounce(state.commentText, 500);
  useEffect(() => {
    getempolyeeBySearch(search);
  }, [search]);

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

      <div className="composer-area">
        <form className="inputs">
          <div className="inp">
            <CustomMentions
              onChange={(event) => {
                setState((preValue) => ({
                  ...preValue,
                  commentText: event,
                }));
                // getempolyeeBySearch(state.commentText);
              }}
              row={1}
              ref={commentText}
              style={{ height: "25px", border: "none" }}
              onSelect={(e) => {
                console.log(e);
                setMentionsInTitle((preValue) => [...preValue, e]);
              }}
              value={state.commentText}
              onKeyPress={(event) => saveComment(event)}
              mentions={mentions}
              placeholder={placeHolder}
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
