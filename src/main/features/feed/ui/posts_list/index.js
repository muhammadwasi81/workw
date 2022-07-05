import PostItem from "./post/index";
import thor from "./../../../../../content/thor.jpg";
import ballon from "./../../../../../content/ballon.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeed } from "../../store/actions";
import { useEffect } from "react";

function PostsList() {
  const { userSlice, feedSlice } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllFeed({
        pageNo: 1,
        pageSize: 5,
        search: "",
        referenceId: userSlice.user.id,
        referenceType: 1,
        filterType: 1,
      })
    );
  }, []);

  if (feedSlice.allFeed.loading) return <p>Loading</p>;
  return (
    <div className="newsList ">
      {!feedSlice.allFeed.posts.length > 0 ? (
        <p>No Posts</p>
      ) : (
        feedSlice.allFeed.posts.map((post) => <PostItem post={post} />)
      )}
    </div>
  );
}

export default PostsList;
