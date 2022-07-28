import PostItem from "./post/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeed } from "../../store/actions";
import { useEffect } from "react";
import PostSkeleton from "./post/skeleton/post";

function PostsList() {
  const { userSlice, feedSlice } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllFeed({
        pageNo: 1,
        pageSize: 20,
        search: "",
        referenceId: userSlice.user.id,
        referenceType: 1,
        filterType: 1,
      })
    );
  }, []);

  if (feedSlice.allFeed.loading) return <PostSkeleton />;
  return (
    <div className="newsList ">
      {!feedSlice.allFeed.posts.length > 0 ? (
        <p>No Posts</p>
      ) : (
        feedSlice.allFeed.posts.map((post) => (
          <PostItem post={post} viewAllComments={true} />
        ))
      )}
    </div>
  );
}

export default PostsList;
