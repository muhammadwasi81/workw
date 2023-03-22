import {
	ArrowLeftOutlined,
	CloseOutlined,
	DownOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import WhiteCard from "../../../../../UI/WhiteCard";
import CourseContentCollapseCard from "../../../../Detail/components/UIElements/CourseContentCollCard";
import DetailCollapse from "../../../../Detail/components/UIElements/DetailCollapse";
import DetailLayout from "../../../Layout/DetailLayout";

const DUMMY_DATA = [
	{
		name: "Start the Program",
		details: [
			{
				title:
					"Introducing to course: Foundation of User Experience Design.",
				type: 1,
				duration: 20,
			},
			{
				title: "Specialists, generalists, and T-shaped designers.",
				type: 2,
				duration: 20,
			},
			{
				title: "Identify good user experience",
				type: 3,
				duration: 20,
			},
		],
	},
	{
		name: "Start the Program 123",
		details: [
			{
				title:
					"Introducing to course: Foundation of User Experience Design.",
				type: 1,
				duration: 20,
			},
			{
				title: "Specialists, generalists, and T-shaped designers.",
				type: 2,
				duration: 20,
			},
			{
				title: "Identify good user experience",
				type: 3,
				duration: 20,
			},
		],
	},
	{
		name: "Start the Program 23432",
		details: [
			{
				title:
					"Introducing to course: Foundation of User Experience Design.",
				type: 1,
				duration: 20,
			},
			{
				title: "Specialists, generalists, and T-shaped designers.",
				type: 2,
				duration: 20,
			},
			{
				title: "Identify good user experience",
				type: 3,
				duration: 20,
			},
		],
	},
];
function CourseContent() {
	const [hideContent, setHideContent] = useState(false);
	const handleContent = () => {
		setHideContent(!hideContent);
	};
	return (
		<DetailLayout>
			<main className="flex flex-1 gap-7">
				<section className="flex-1 relative">
					{hideContent && (
						<div
							className="absolute border border-[#6a6f73] px-[10px] left-[100%] flex items-center py-[5px] w-max gap-3 top-10 hover:bg-[#393b3f] hover:cursor-pointer group z-50 video_arrow"
							onClick={handleContent}
						>
							<ArrowLeftOutlined className="group-hover:!text-white" />
							<div className="group-hover:font-bold group-hover:text-white opacity-0 group-hover:opacity-100">
								Course content
							</div>
						</div>
					)}
					<WhiteCard>
						<video
							className="min-h-[556px] h-[556px] w-full"
							src={
								"https://konnect.im/upload/static/feedvideo.mp4"
							}
							controls
							autoPlay
						></video>
					</WhiteCard>
				</section>
				{!hideContent && (
					<section className="basis-[25%]">
						<WhiteCard className="!p-0 overflow-hidden">
							<div className="flex items-center justify-between border-b border-[#d1d7dc] px-[10px] py-[8px] overflow-hidden">
								<h1 className="font-bold !mb-0">
									Course content
								</h1>
								<CloseOutlined
									className="!cursor-pointer"
									onClick={handleContent}
								/>
							</div>
							<hr />
							<DetailCollapse
								iconRotate={180}
								ExpandIcon={DownOutlined}
								expandIconPosition="end"
								className="content_collapse"
								headerClasses="text-sm"
								data={DUMMY_DATA}
								Component={CourseContentCollapseCard}
							/>
						</WhiteCard>
					</section>
				)}
			</main>
		</DetailLayout>
	);
}

export default CourseContent;
