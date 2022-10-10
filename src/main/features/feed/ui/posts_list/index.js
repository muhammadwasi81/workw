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
	const [feed, setFeed] = useState([]);
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

	useEffect(() => {
		setFeed([...feed, ...posts]);
	}, [JSON.stringify(posts)]);

	// if (feedSlice.allFeed.loading) return <PostSkeleton />;
	return (
		<Scroll
			data={feed}
			fetchMoreData={pageNo => {
				setPageNo(pageNo);
			}}
			height={981}
		>
			<div className="newsList ">
				{!feed.length > 0 ? (
					<p>No Posts</p>
				) : (
					feed.map(post => (
						<PostItem
							post={post}
							viewAllComments={true}
							referenceType={referenceType}
							referenceId={referenceId}
							reactionModule={reactionModule}
						/>
					))
				)}
			</div>
		</Scroll>
	);
}

export default PostsList;
