import React, { useEffect } from "react";
import Post from "../posts_list/post";
import { useSelector, useDispatch } from "react-redux";
import "../stylesheet/EventBox.css";
import "../stylesheet/NewsFeed.css";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { useParams } from "react-router-dom";
import { getFeedById } from "../../store/actions";
import Header from "../../../../layout/header";
function PostDetail() {
  const { singlePost } = useSelector((state) => state.feedSlice);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getFeedById(id));
  }, [id, dispatch]);
  return (
    <TabbableContainer>
      <Header />
      <ContBody>
        <div className="newsFeed">
          <div className="newsList">
            <div className="postDetails">
              {Object.keys(singlePost).length === 0 ? (
                <p>No Post</p>
              ) : (
                <Post post={singlePost} />
              )}
            </div>
          </div>
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default PostDetail;
