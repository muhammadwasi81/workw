import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { STRINGS } from "../../../utils/base";
import { addReaction } from "../../features/feed/store/actions";
import CommentItem from "./commentItem";
import CommentComposer from "./Composer";
import { getAllComment } from "./services";
import { ReactionType } from "../../features/feed/utils/constants";
import {
  addCommentsReaction,
  addFeedReaction,
} from "../../features/feed/store/slice";

function CommentWrapper({
  initailComments = [],
  referenceId,
  module = 1,
  commentRequestSuccess,
  placeHolder,
  isCommentLoad = false,
  initialMentions = [],
  placeHolderReply,
  loadSkeleton = false,
  showComments = true,
  isDetailViewOpen = true,
  reactionModule,
  isDetail = false,

  setShowComments = () => {},
}) {
  const [comments, setComments] = useState([]);
  const [likeClass, setLikeClass] = useState("hello boy");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  useEffect(() => {
    const newResponse = initailComments?.map((it) => {
      return {
        ...it,
        cssClass: "no",
      };
    });
    setComments([...newResponse]);
  }, [JSON.stringify(initailComments)]);

  useEffect(() => {
    isCommentLoad && getComments(referenceId, STRINGS.DEFAULTS.guid, module);
  }, []);

  const getComments = async (referenceId, parentId, module) => {
    const response = await getAllComment(referenceId, parentId, module);
    setComments([...response]);
  };

  if (comments.length === 0 && loadSkeleton) return <Skeleton active />;
  console.log(comments, "commentss");

  const handleAddReaction = (youLikeType, id, commentId) => {
    console.log(youLikeType, id, "youliketypee");
    if (youLikeType === ReactionType.NoReaction) {
      dispatch(
        addCommentsReaction({
          referenceId: id,
          reactionMode: "click",
          ReactionType: ReactionType.NoReaction,
          isDetail,
          id: commentId,
        })
      );
      dispatch(
        addReaction({
          referenceId: id,
          reactionModule,
          reactionType: ReactionType.NoReaction,
        })
      );
      return;
    } else {
      dispatch(
        addCommentsReaction({
          referenceId: id,
          reactionMode: "click",
          reactionType: youLikeType,
          isDetail,
        })
      );
      dispatch(
        addReaction({
          referenceId: id,
          reactionModule: 3,
          reactionType: youLikeType,
        })
      );
    }
    //todo set className for comments
    const updatedComments = comments.map((item) => {
      // console.log(item);
      if (item.id === id) {
        return {
          ...item,
          cssClass: "liked",
        };
      } else {
        return item;
      }
    });
    setComments(updatedComments);
    // setLikeClass("liked");
  };
  // console.log("initailComments", initailComments);
  return (
    <div className="commentWrapper">
      <CommentComposer
        referenceId={referenceId}
        placeHolder={placeHolder}
        module={module}
        commentRequestSuccess={(comment) => {
          setComments((preValue) => [comment, ...preValue]);
          commentRequestSuccess && commentRequestSuccess(comment);
        }}
        setShowComments={setShowComments}
      />
      {(showComments || isDetailViewOpen) && (
        <div className="comments">
          {comments.map(
            ({
              type,
              comment,
              creator = {
                designation: user?.designation || "",
                name: user.name,
                image: user.userImage,
              },
              createDate = new Date(),
              id: commentID,
              referenceId,
              mentions: mentionedUser,
              attachments,
              attachmentCount,
              attachmentFile,
              reactionCount,
              cssClass,
              mentions,
              myReaction,
            }) => {
              const { designation, name, image } = creator;
              return (
                <CommentItem
                  user={user}
                  placeHolderReply={placeHolderReply}
                  initialMentions={initialMentions}
                  mentionedUser={mentionedUser}
                  module={module}
                  likeClass={`${likeClass}`}
                  handleLike={handleAddReaction}
                  comment={{
                    content: comment,
                    parentId: commentID,
                    referenceId: referenceId,
                    type,
                    createDate,
                    youLikeType: 0,
                    likeCounter: 0,
                    reactionModule,
                    reactionCount,
                    creator: {
                      name,
                      image,
                      designation,
                    },
                    attachments,
                    attachmentCount,
                    attachmentFile,
                    cssClass: cssClass,
                    mentions: mentions,
                    myReaction: myReaction,
                  }}
                />
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default CommentWrapper;
