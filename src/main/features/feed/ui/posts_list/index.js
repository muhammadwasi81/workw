import PostItem from "./post/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeed } from "../../store/actions";
import { useEffect, useState } from "react";
import PostSkeleton from "./post/skeleton/post";
import { ReactionModuleEnum } from "../../../../../utils/Shared/enums/enums";
import Scroll from "../../../../sharedComponents/ScrollSelect/infinteScoll";

function PostsList({ referenceType, referenceId, reactionModule }) {
	const { userSlice, feedSlice } = useSelector(state => state);
	const [pageNo, setPageNo] = useState(1);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			getAllFeed({
				pageNo,
				pageSize: 20,
				search: "",
				referenceId: referenceId ? referenceId : userSlice.user.id,
				referenceType,
				filterType: 1,
			})
		);
	}, [pageNo]);
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
					// isLoading={feedSlice.allFeed.loading}
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
