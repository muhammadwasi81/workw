import { Skeleton } from "antd";
import React from "react";

function ContactDetailSkeleton() {
	return (
		<>
			<div className="grid gap-x-5 grid-cols-[1.8fr_1.3fr_0.3fr]">
				<Skeleton.Input active block />
				<Skeleton.Input active block />
				<Skeleton.Input active block />

				<div
					style={{ gridArea: "1/3/span 2/ span 1" }}
					className="flex items-end"
				>
					<Skeleton.Image active block />
				</div>
			</div>
			<br />
			<div className="grid grid-cols-2 gap-5">
				<Skeleton.Input active block />
				<Skeleton.Input active block />
				<Skeleton.Input active block />
				<Skeleton.Input active block />
				<Skeleton.Input active block />
				<Skeleton.Input active block />
			</div>
			<br />
			<div>
				<Skeleton active />
			</div>
			<Skeleton.Button active className=" ml-auto !block" />
		</>
	);
}

export default ContactDetailSkeleton;
