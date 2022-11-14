import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./post/index";
import { getAllFeed } from "../../store/actions";
import PostSkeleton from "./post/skeleton/post";
import Scroll from "../../../../sharedComponents/ScrollSelect/infinteScoll";
import { FeedFilterTypeEnum } from "../../utils/constants";

function PostsList({ referenceType, referenceId, reactionModule }) {
	// const { userSlice, feedSlice } = useSelector(state => state);
	const userSlice = useSelector(state => state.userSlice);
	const feedSlice = useSelector(state => state.feedSlice);
	const [pageNo, setPageNo] = useState(1);
	const dispatch = useDispatch();
	const navigate = useLocation().search.split("=")[1] || "posts";

	useEffect(() => {
		const promise = dispatch(
			getAllFeed({
				pageNo,
				pageSize: 20,
				search: "",
				referenceId: referenceId ? referenceId : userSlice.user.id,
				referenceType,
				filterType: FeedFilterTypeEnum[navigate],
			})
		);
		return () => {
			promise.abort();
		};
	}, [pageNo, navigate]);
	const { posts } = feedSlice.allFeed;

	if (feedSlice.allFeed.loading && posts.length === 0)
		return <PostSkeleton />;

	return (
		<div className="newsList">
			{!posts.length > 0 ? (
				<p style={{ textAlign: "center" }}>
					<b>No Posts...</b>
				</p>
			) : (
				<Scroll
					isLoading={feedSlice.allFeed.loading}
					data={posts}
					fetchMoreData={pageNo => {
						setPageNo(pageNo);
					}}
					loader={<PostSkeleton />}
					endMessage={"No more posts..."}
				>
					{posts.map((post, index) => (
						<PostItem
							key={index}
							post={post}
							viewAllComments={true}
							referenceType={referenceType}
							referenceId={referenceId}
							reactionModule={reactionModule}
						/>
					))}
				</Scroll>
			)}
		</div>
	);
}

export default PostsList;
