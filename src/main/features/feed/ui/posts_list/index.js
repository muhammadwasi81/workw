import PostItem from "./post/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeed } from "../../store/actions";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function PostsList() {
  const { userSlice, feedSlice } = useSelector((state) => state);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const getFeed = (id, pageNo) => {
    dispatch(
      getAllFeed({
        pageNo,
        pageSize: 20,
        search: "",
        referenceId: id,
        referenceType: 1,
        filterType: 1,
      })
    );
  };
  useEffect(() => {
    getFeed(userSlice.user.id, pageNo);
  }, []);
  useEffect(() => {
    if (pageNo > 1) getFeed(userSlice.user.id, pageNo);
  }, [pageNo]);

  const fetchMoreData = () => {
    setPageNo((preValue) => ++preValue);
    console.log("fetch more");
  };

  return (
    <div className="newsList ">
      {!feedSlice.allFeed.posts.length > 0 ? (
        <p>No Posts</p>
      ) : (
        <div id="scrollableDiv" style={{ height: "80vh", overflow: "auto" }}>
          <InfiniteScroll
            dataLength={feedSlice.allFeed.posts.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {feedSlice.allFeed.posts.map((post) => (
              <PostItem post={post} viewAllComments={true} />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

export default PostsList;
