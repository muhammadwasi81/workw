import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
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
import Avatar from "../../../../../../../sharedComponents/Avatar/avatar";
import { useSelector } from "react-redux";
import "../../../../courses/style.css";
import { addAssignMember, addMember } from "../../../../../store/slice";
import AssignMemberModal from "../../../Components/AssignMemModal";
import { AssignMemEnum, MemberEnum } from "../../../../../constant/index";
import MemberModal from "../../../Components/MemberModal";
import defaultImage from "../../../../../../../../content/NewContent/courses/courseDefault.jpg"

function CoursesDetail() {
	const disptach = useDispatch()
	const navigate = useNavigate();
	const id = useParams().id;
	const { courseDetail, loaders } = useSelector((state) => state.eLearningSlice);
	let {
		image,
		name,
		creator,
		assignMembers,
		members,
		description,
		courseType,
		curriculums,
	} = courseDetail
	console.log(members,"sadsdsds");
	let Default = defaultImage
	// let Default = "https://www.makeintern.com/learning/img/online-course12.jpg"
	let loader = loaders.courseDetailLoading

	useEffect(() => {
		disptach(GetCourseById(id))
	},[])

	const items = [
		{
			label: `About`,
			key: "1",
			children: <CourseAbout content={description} />,
		},
		{
			label: `Curriculum`,
			key: "2",
			children: <CourseCurriculum curriculums={curriculums} />,
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
						{
							loader ? 
							<>
								<Skeleton.Image style={{width: "100%", height:"250px"}} active={true} />
								<Skeleton paragraph={{ rows: 4 }} />
							</>
							: 
							<>
								<DetailPageTopDetail
								image={image ? image : Default}
								difficulty={{ name: tag[courseType], icon: LevelsIcon[courseType] }}
								// lastUpdated={"Syed Danish Ali"}
								title={name}
								createdBy={creator && creator.name}
								members={
									members &&
										<>
											<div className="members"> 
												<Avatar
													className="MembersList"
													isAvatarGroup={true}
													isTag={false}
													heading={"members"}
													membersData={members ? members : []}
													text={"Members"}
													image={"https://joeschmoe.io/api/v1/random"}
												/>
												<div className="addMemberBtn" onClick={() => disptach(addMember({status: true, type: MemberEnum.courses}))} >+</div>
											</div>
											<MemberModal />
										</>
								}
								assignedTo={
									assignMembers &&
										<>
											<div className="members"> 
												<Avatar
													className="MembersList"
													isAvatarGroup={true}
													isTag={false}
													heading={"members"}
													membersData={assignMembers ? assignMembers : []}
													text={"Members"}
													image={"https://joeschmoe.io/api/v1/random"}
												/>
												<div className="addMemberBtn" onClick={() => disptach(addAssignMember({status: true, type: AssignMemEnum.courses}))} >+</div>
											</div>
											<AssignMemberModal />
										</>
									}
								imageHeight={"200px"}
								headingSize={"30px"}
							/>
							<DetailTabs items={items} />
							</>
						}
					</WhiteCard>
				</section>
				<section
					className="flex basis-[25%] overflow-y-auto h-fit"
					onScroll={() => {
						console.log("scroll");
					}}
				>
					<WhiteCard className="flex flex-col gap-1 w-full">
						{
							loader ? 
							<>
								<Skeleton.Image style={{width: "100%", height:"250px"}} active={true} />
								<Skeleton paragraph={{ rows: 4 }} />
							</> :
							<>
								<DetailPageTopDetail
									image={Default}
									title={"Description"}
									description={description}
								/>
								{/* <div className="font-bold text-xs flex items-center justify-between mb-2">
									<p className="!mb-0 flex items-center gap-1">
										<ClockCircleOutlined /> 1h 30m
									</p>
									<p className="!mb-0 flex items-center gap-1">
										<BsFileText className="!text-lg" /> 5 Modules
									</p>
								</div> */}
								{/* <ModulesList /> */}

								<Button
									className="primary_btn !w-full !justify-center hover:shadow-lg transition-all"
									block
									onClick={() =>
										navigate(`/eLearning/courses/learn/${id}`)
									}
								>
									Start
								</Button>
							</>
						}
					</WhiteCard>
				</section>
			</main>
		</DetailLayout>
	);
}

export default CoursesDetail;
