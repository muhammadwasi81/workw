import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { BsFileText } from "react-icons/bs";
import WhiteCard from "../../../../../UI/WhiteCard";
import { LevelsIcon, tag } from "../../../Components/CourseCard";
import DetailLayout from "../../../Layout/DetailLayout";
import DetailTabs from "../../../../Detail/components/DetailTabs";
import DetailPageTopDetail from "../../../../Detail/components/UIElements/DetailHead";
import ModulesList from "../../../../Detail/components/UIElements/ModulesList";
import CourseAbout from "./CourseAbout";
import CourseCurriculum from "./CourseCurriculum";
import CourseQuizes from "./CourseQuizes";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetCourseById } from "../../../../../store/action";
import Avatar from "../../../../../../../sharedComponents/Avatar/avatarOLD";

function CoursesDetail() {
	const disptach = useDispatch()
	const navigate = useNavigate();
	const id = useParams().id;
	
	useEffect(() => {
		disptach(GetCourseById(id))
	},[])


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
				<section className="flex basis-[75%] overflow-y-auto detail_section">
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
					<div className="members">
						<div className="members">
						{/* {approvers && ( */}
							<Avatar
							isAvatarGroup={true}
							isTag={false}
							heading={"approvers"}
							// membersData={approvers ? approvers : []}
							text={"Approvers"}
							image={"https://joeschmoe.io/api/v1/random"}
							/>
						{/* )} */}
						</div>
					</div>
				</section>
				<section
					className="flex basis-[25%] overflow-y-auto h-fit"
					onScroll={() => {
						console.log("scroll");
					}}
				>
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
							onClick={() =>
								navigate(`/eLearning/courses/learn/${id}`)
							}
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
