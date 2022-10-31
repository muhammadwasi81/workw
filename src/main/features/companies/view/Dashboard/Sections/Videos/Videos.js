import React from "react";
import VideoCard from "../../Components/VideoCard";

function Videos() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
			<VideoCard />
			<VideoCard />
			<VideoCard />
			<VideoCard />
			<VideoCard />
		</div>
	);
}

export default Videos;
