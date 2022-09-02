import { Skeleton } from "antd";
import React from "react";

function TravelDetailSkeleton() {
	return (
		<>
			<div className="w-full flex flex-col items-center">
				<Skeleton avatar active />
				<Skeleton.Image
					active
					className="!w-[380px] !h-[188px] !rounded-xl"
				/>
				<hr />
			</div>
			<Skeleton.Button active />
			<div className="flex gap-4">
				<Skeleton.Avatar active />
				<Skeleton.Input active block />
			</div>

			<Skeleton.Button active />
			<div className="flex gap-4">
				<Skeleton.Avatar active />
				<Skeleton.Input active block />
			</div>
		</>
	);
}

export default TravelDetailSkeleton;
