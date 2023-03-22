import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticle } from "../../../../store/action";
import { NoDataFound } from "../../../../../../sharedComponents/NoDataIcon";
import ThumbnailSkeleton from "../../UI/thumbnailSkeleton";
import ArticleCard from "../../Components/ArticleCard";

function Article() {
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({ pageNo: 1, pageSize: 20, search: "", sortBy: 1   })

	const { 
		loaders, 
		articles
	} = useSelector((state) => 
		state.eLearningSlice)
	let loading = loaders.articlesLoading;

	useEffect(() => {
		dispatch(getAllArticle(filter))
	}, [])

	return (
		<> 
			<div 
			className={loading || articles?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2" : !loading && ""}>
				{   loading ? 
						<ThumbnailSkeleton count={[1,2]} /> :
						articles?.length > 0 ? articles.map((item) => {
						return <ArticleCard data={item} />
					}) :  
					!loading && <> <NoDataFound /></>
				}
			</div>
		</>
	);
}

export default Article;
