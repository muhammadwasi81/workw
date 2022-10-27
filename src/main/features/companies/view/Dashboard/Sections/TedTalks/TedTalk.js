import React from "react";
import TedTalkCard from "../../Components/TedTalkCard";

function TedTalk() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
			<TedTalkCard />
			<TedTalkCard />
			<TedTalkCard />
			<TedTalkCard />
			<TedTalkCard />
		</div>
	);
}

export default TedTalk;
