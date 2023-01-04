import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from "../../../../store/action";
import EbookCard from "../../Components/EbookCard";
import { NoDataFound } from "../../../../../../sharedComponents/NoDataIcon";
import ThumbnailSkeleton from "../../UI/thumbnailSkeleton";

function Books() {
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({ pageNo: 1, pageSize: 20, search: "", sortBy: 1, filterType: 1 })

	const { books, loaders } = useSelector((state) => state.eLearningSlice);
	let loading = loaders.bookLoading;

	useEffect(() => {
		dispatch(getAllBook(filter))
	}, [])

	return (
		<>
			<div 
				className={loading || books?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2" : !loading && ""}>
			{   loading ? 
					<ThumbnailSkeleton count={[1,2]} /> :
					books?.length > 0 ? books.map((item) => {
					return <EbookCard data={item} />
				}) :  ""
				// !loading && <> <NoDataFound /></>
			}
			</div>
		</>
	);
}

export default Books;

