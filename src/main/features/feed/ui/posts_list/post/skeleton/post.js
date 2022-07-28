import React from "react";
import { Skeleton } from "antd";
import "./style.css";
function PostSkeleton() {
  return [...Array(3)].map((item) => {
    return (
      <div className="postSkeleton">
        <div className="postSkeleton__header">
          <Skeleton.Avatar size={"default"} shape={"circle"} />
          <Skeleton.Input size={"default"} />
        </div>
        <div className="postSkeleton__body">
          <Skeleton.Image loading={true} />
        </div>
        <div className="postSkeleton__footer">
          <Skeleton.Input size={"small"} block />
          <Skeleton.Input size={"small"} block />
          <Skeleton.Input size={"small"} block />
        </div>
      </div>
    );
  });
}

export default PostSkeleton;
