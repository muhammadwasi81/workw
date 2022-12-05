import React from "react";
import { Skeleton } from "antd";

function ScheduleDetailSkeleton() {
	return (
		<div>
			<div className="flex gap-2 mb-10">
				<Skeleton active paragraph={{ rows: 1, width: "100%" }} />
				<Skeleton active paragraph={{ rows: 1, width: "100%" }} />
			</div>

			<Skeleton active paragraph={{ rows: 4, width: "100%" }} />
		</div>
	);
}

export default ScheduleDetailSkeleton;
