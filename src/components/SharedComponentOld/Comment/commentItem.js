import React, { useState } from 'react';
import Avatar from '../Avatar/avatar';
import './style.css';
import DotesIcon from './assets/dotes.svg';
import CommentComposer from './Composer';

const CommentItem = (props) => {
  const defaultCreator = {
    id: '',
    name: '',
    image: '',
    designation: '',
    status: '',
  };
  let {
    isReply = false,
    creator = defaultCreator,
    commentTime = '',
    content = '',
    youLikeType = 0,
    likeCounter = 0,
    handleLike,
    likeClass,
  } = props;
  let { id, name, image, designation } = creator;
  const [openComposer, setOpenComposer] = useState(false);

  console.log(handleLike, "handleLike")

  return (
    <div className={'CommentItem ' + (isReply ? 'ReplyComment' : '')}>
      <div>
        <Avatar src={image} name={name} size={35} round={true} />
      </div>
      <div style={{ flex: '1' }}>
        <div className="CommentBubble">
          <div className="CommentHeader">
            <div className="CommentHeaderDet">
              <div className="name">
                <span>{name}</span>
              </div>
              <div className="designation">{designation}</div>
            </div>
            <div className="CommentHeaderIcon">
              <img src={DotesIcon} alt="" />
              <span>{commentTime}</span>
            </div>
          </div>

          <div>{content}</div>
        </div>

        <div className="likeReplyCont">
          <div className={likeClass} onClick={() => handleLike(id)}>Like</div>
          <div onClick={() => setOpenComposer(!openComposer)}>Reply</div>
        </div>
        <div>{openComposer && <CommentComposer />}</div>
      </div>
    </div>
  );
};
export default CommentItem;
