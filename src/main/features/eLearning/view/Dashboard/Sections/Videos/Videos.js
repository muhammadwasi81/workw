import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideo } from "../../../../store/action";
import { NoDataFound } from "../../../../../../sharedComponents/NoDataIcon";
import ThumbnailSkeleton from "../../UI/thumbnailSkeleton";
import VideoCard from "../../Components/VideoCard";

function Video() {
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({ pageNo: 1, pageSize: 20, search: "", sortBy: 1   })

	const {
		loaders,
		videos
	} = useSelector((state) =>
		state.eLearningSlice)
	let loading = loaders.videosLoading;

	useEffect(() => {
		dispatch(getAllVideo(filter))
	}, [])

	return (
		<>
			<div
				className={loading || videos?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2" : !loading && ""}>
				{   loading ?
					<ThumbnailSkeleton count={[1,2]} /> :
					videos?.length > 0 ? videos.map((item) => {
							return <VideoCard data={item} />
						}) :
						!loading && <> <NoDataFound /></>
				}
			</div>
		</>
	);
}

export default Video;
