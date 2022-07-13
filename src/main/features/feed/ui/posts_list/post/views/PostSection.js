import { useState } from "react";
import PostModel from "./PostModel";
import thor from "./../../../../../../../content/thor.jpg";
import PostModalLeft from "./PostModalLeft";
import PostAttachment from "./PostAttachment";
import Polls from "../../../../../../sharedComponents/Polls";

const PostSection = ({ post, isOpen, onOpen }) => {
  const { title, attachments, pollOptions, voteCount } = post;
  const fakePost = {
    image: [thor, thor, thor],
  };
  //   const attachments = [
  //     {
  //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       path: "https://picsum.photos/1600/600",
  //       attachmentName: "string",
  //       attachmentTypeId: 0,
  //       extensionTypeId: 0,
  //       fileSize: 0,
  //       duration: 0,
  //       width: 0,
  //       height: 0,
  //     },
  //     {
  //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       path: "https://picsum.photos/1600/600",
  //       attachmentName: "string",
  //       attachmentTypeId: 0,
  //       extensionTypeId: 0,
  //       fileSize: 0,
  //       duration: 0,
  //       width: 0,
  //       height: 0,
  //     },
  //     {
  //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       path: "https://picsum.photos/1600/600",
  //       attachmentName: "string",
  //       attachmentTypeId: 0,
  //       extensionTypeId: 0,
  //       fileSize: 0,
  //       duration: 0,
  //       width: 0,
  //       height: 0,
  //     },
  //     {
  //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       path: "https://picsum.photos/1600/600",
  //       attachmentName: "string",
  //       attachmentTypeId: 0,
  //       extensionTypeId: 0,
  //       fileSize: 0,
  //       duration: 0,
  //       width: 0,
  //       height: 0,
  //     },
  //   ];
  //   const plainOptions = [
  //     {
  //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       option: "string1",
  //       attachmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       votes: 3,
  //       youVoted: false,
  //     },
  //     {
  //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       option: "string2",
  //       attachmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       votes: 4,
  //       youVoted: false,
  //     },
  //     {
  //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       option: "string3",
  //       attachmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       votes: 3,
  //       youVoted: true,
  //     },
  //   ];

  return (
    <>
      <div className="post-section">
        <p>{title}</p>
        {pollOptions.length > 1 && (
          <Polls
            options={pollOptions}
            voteCounts={voteCount}
            attachments={attachments}
          />
        )}
        <div className="post-section-attachments">
          {attachments.length > 0 && (
            <PostAttachment attachments={attachments} onOpen={onOpen} />
          )}
        </div>
      </div>
      {/* you can also pass a component to leftComponent which will render on the leftside // put false in it if you dont component */}
      <PostModel
        post={fakePost}
        setModelState={() => onOpen(false)}
        open={isOpen}
        leftComponent={<PostModalLeft post={post} />}
      />
    </>
  );
};

export default PostSection;
