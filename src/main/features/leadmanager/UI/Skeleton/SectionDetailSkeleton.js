import React from "react";
import { Skeleton } from "antd";

function SectionDetailSkeleton() {
	return (
		<div className="flex gap-5">
			<div className="basis-7/12">
				<Skeleton.Image
					active={true}
					block={true}
					className="!w-full !h-[200px]"
				/>
				<br />
				<br />
				<Skeleton.Input active={true} block={true} />
				<br />
				<br />
				<Skeleton.Input active={true} block={true} />
				<br />
				<br />
				<Skeleton.Input active={true} block={true} />
				<br />
				<br />
				<Skeleton.Input active={true} block={true} />
				<br />
				<br />
				<Skeleton.Input active={true} block={true} />
				<br />
				<br />
				<Skeleton.Input active={true} block={true} />
				<br />
				<br />
				<Skeleton.Button active className=" ml-auto !block" />
			</div>
			<div className="basis-5/12 flex flex-col gap-3">
				<Skeleton active />
				<Skeleton active />
				<Skeleton active />
			</div>
		</div>
	);
}

export default SectionDetailSkeleton;
