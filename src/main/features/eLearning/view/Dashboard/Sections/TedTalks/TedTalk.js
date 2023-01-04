import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook, getAllTedTalk } from "../../../../store/action";
import EbookCard from "../../Components/EbookCard";
import { NoDataFound } from "../../../../../../sharedComponents/NoDataIcon";
import ThumbnailSkeleton from "../../UI/thumbnailSkeleton";
import TedTalkCard from "../../Components/TedTalkCard";

function TedTalk() {
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({ pageNo: 1, pageSize: 20, search: "", sortBy: 1, filterType: 1 })

	const { tedTalks, loaders } = useSelector((state) => state.eLearningSlice);
	let loading = loaders.TedTalkLoading;

	useEffect(() => {
		dispatch(getAllTedTalk(filter))
	}, [])

	console.log(tedTalks, "tedTalks")


	return (
		<>
			<div 
				className={loading || tedTalks?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2" : !loading && ""}>
			{   loading ? 
					<ThumbnailSkeleton count={[1,2]} /> :
					tedTalks?.length > 0 ? tedTalks.map((item) => {
					return <TedTalkCard data={item} />
				}) :  
				!loading && <> <NoDataFound /></>
			}
			</div>
		</>
	);
}

export default TedTalk;
