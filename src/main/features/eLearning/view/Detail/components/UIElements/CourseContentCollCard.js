import { Checkbox } from "antd";
import React from "react";
import "./UIelement.css";
import { FileOutlined, PlayCircleFilled } from "@ant-design/icons";

function CourseContentCollapseCard({ data }) {
	return (
		<>
			{data.details.map(detail => (
				<div className="flex gap-4 hover:cursor-pointer hover:bg-[#d1d7dc] px-[20px] py-[10px] hover:!text-black group transition-all">
					<Checkbox
						className="custom_video_checkbox"
						disabled
						checked
					/>
					<div className="">
						<div className="mb-2">{detail.title}</div>
						<div className="flex items-center gap-2">
							{detail.type === 1 ? (
								<PlayCircleFilled
									color="#6a6f73"
									className="!text-[#6a6f73] group-hover:!text-black"
								/>
							) : (
								<FileOutlined
									color="#6a6f73"
									className="!text-[#6a6f73] group-hover:!text-black"
								/>
							)}
							<p className="text-xs !mb-0">
								{detail.duration} min
							</p>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default CourseContentCollapseCard;
