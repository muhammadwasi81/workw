import React from "react";
import ArticleCard from "../../Components/ArticleCard";

function Article() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
			<ArticleCard />
			<ArticleCard />
			<ArticleCard />
			<ArticleCard />
			<ArticleCard />
		</div>
	);
}

export default Article;
