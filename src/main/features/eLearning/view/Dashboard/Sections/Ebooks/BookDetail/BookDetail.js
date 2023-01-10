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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetBookById } from "../../../../../store/action";
import Avatar from "../../../../../../../sharedComponents/Avatar/avatar";
import { useSelector } from "react-redux";
import "../../../../courses/style.css";
import { addAssignMember, addMember } from "../../../../../store/slice";
import AssignMemberModal from "../../../Components/AssignMemModal";
import { AssignMemEnum, MemberEnum } from "../../../../../constant/index";
import MemberModal from "../../../Components/MemberModal";
import { useState } from "react";
import FileViewerModal from "./FileViewerModal";

function EBookDetail() {
	const disptach = useDispatch()
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false)
	const id = useParams().id;
	const { bookDetail } = useSelector((state) => state.eLearningSlice);
	let {
		image,
		name,
		creator,
		assignMembers,
		members,
		description,
		information,
		attachment,
	} = bookDetail
	let Default = "https://www.makeintern.com/learning/img/online-course12.jpg"

	useEffect(() => {
		disptach(GetBookById(id))
	},[])

	

	return (
		<>
			<DetailLayout>
			<main className="flex flex-1 gap-10 h-full overflow-hidden">
				<section className="flex basis-[75%] overflow-y-auto detail_section">
					<WhiteCard className="flex flex-col gap-5 w-full h-fit">
						<DetailPageTopDetail
							// image={image ? image : Default}
							// difficulty={{ name: tag[1], icon: LevelsIcon[1] }}
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
											<div className="addMemberBtn" onClick={() => 
												disptach(addMember({status: true, type: MemberEnum.ebook}))} >+</div>
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
											<div className="addMemberBtn" onClick={() => disptach(addAssignMember({status: true, type: AssignMemEnum.ebook}))} >+</div>
										</div>
										<AssignMemberModal />
									</>
								}
							imageHeight={"200px"}
							headingSize={"30px"}
						/>
						<h3 style={{color: "#222",fontSize: "17px",fontWeight: '600',marginBottom: '0px'}} >Description</h3>
						{
							description && description 
						}
						{/* <DetailTabs items={items} /> */}
					</WhiteCard>
				</section>
				<section
					className="flex basis-[25%] overflow-y-auto h-fit"
					onScroll={() => {
						console.log("scroll");
					}}
				>
					<WhiteCard className="flex flex-col gap-1 w-full">
						<DetailPageTopDetail
							image={image ? image : Default}
							title={"Book Information"}
							description={information ===  "" ?  "Information will come here" : information}
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
							style={{marginBottom: "5px"}}
							onClick={() => setIsOpen(true)}
						>
							Read
						</Button>
						<Button
							className="primary_btn !w-full !justify-center hover:shadow-lg transition-all"
							block
							style={{marginBottom: "5px"}}
							onClick={() => console.log("Read Button Clicked")}
						>
							Delete Book
						</Button>
						<Button
							className="primary_btn !w-full !justify-center hover:shadow-lg transition-all"
							block
							style={{marginBottom: "10px"}}
							onClick={() => console.log("Read Button Clicked")}
						>
							Update
						</Button>
						<Button
							className="primary_btn !w-full !justify-center hover:shadow-lg transition-all"
							block
							style={{marginBottom: "10px"}}
							onClick={() => disptach(addAssignMember({status: true, type: AssignMemEnum.ebook}))}
						>
							Assign
						</Button>
					</WhiteCard>
				</section>
			</main>
		</DetailLayout>
		<FileViewerModal isOpen={isOpen} onCancel={() => setIsOpen(false)} viewItem={attachment} />
		</>
	);
}

export default EBookDetail;
