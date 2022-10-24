import { ClockCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { BsFileText } from "react-icons/bs";
import WhiteCard from "../../../UI/WhiteCard";
import { LevelsIcon, tag } from "../../Dashboard/Components/CourseCard";
import DetailLayout from "../../Dashboard/Layout/DetailLayout";
import DetailTabs from "../components/DetailTabs";
import DetailPageTopDetail from "../components/UIElements/DetailHead";
import ModulesList from "../components/UIElements/ModulesList";
import CourseAbout from "./CourseAbout";
import CourseCurriculum from "./CourseCurriculum";
import CourseQuizes from "./CourseQuizes";

function CoursesDetail() {
	const items = [
		{
			label: `About`,
			key: "1",
			children: <CourseAbout />,
		},
		{
			label: `Curriculum`,
			key: "2",
			children: <CourseCurriculum />,
		},
		{
			label: `Quizes`,
			key: "3",
			children: <CourseQuizes />,
		},
	];
	return (
		<DetailLayout>
			<main className="flex flex-1 gap-10 h-full overflow-hidden">
				<section className="flex basis-[75%] overflow-y-auto">
					<WhiteCard className="flex flex-col gap-5 w-full h-fit">
						<DetailPageTopDetail
							image={
								"https://www.makeintern.com/learning/img/online-course12.jpg"
							}
							difficulty={{ name: tag[1], icon: LevelsIcon[1] }}
							lastUpdated={"Syed Danish Ali"}
							title={"Foundation of User Experience (UX) Design"}
							createdBy={"Syed Danish Ali"}
							assignedTo={"Syed Danish Ali"}
							imageHeight={"200px"}
							headingSize={"30px"}
						/>
						<DetailTabs items={items} />
					</WhiteCard>
				</section>
				<section className="flex basis-[25%] overflow-y-auto h-fit">
					<WhiteCard className="flex flex-col gap-1 w-full">
						<DetailPageTopDetail
							image={
								"https://www.makeintern.com/learning/img/online-course12.jpg"
							}
							title={"Foundation of User Experience (UX) Design"}
							description={
								"lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
							}
						/>
						<div className="font-bold text-xs flex items-center justify-between mb-2">
							<p className="!mb-0 flex items-center gap-1">
								<ClockCircleOutlined /> 1h 30m
							</p>
							<p className="!mb-0 flex items-center gap-1">
								<BsFileText className="!text-lg" /> 5 Modules
							</p>
						</div>
						<ModulesList />

						<Button
							className="primary_btn !w-full !justify-center hover:shadow-lg transition-all"
							block
						>
							Start
						</Button>
					</WhiteCard>
				</section>
			</main>
		</DetailLayout>
	);
}

export default CoursesDetail;
