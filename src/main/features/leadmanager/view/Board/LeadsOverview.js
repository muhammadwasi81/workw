import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Select, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getNameForImage, jsonToFormData } from "../../../../../utils/base";
import { DEFAULT_GUID } from "../../../../../utils/constants";
// import { leadSectionEnum } from "../../enum/enum";
import {
	addLeadManagerAssignTo,
	addLeadManagerDetail,
	getLeadManagerDetailById,
	moveLeadManagerDetail,
} from "../../store/actions";
import CardButton from "../../UI/Button/CardButton";
import SectionForm from "./Sections/SectionForm/SectionForm";
import SectionDetail from "./SectionDetail";
import SectionDetailSkeleton from "../../UI/Skeleton/SectionDetailSkeleton";
import { handleAssignMemberModal } from "../../store/slice";
import CustomModal from "../../../workboard/Modal/CustomModal";
import AssignMemberModal from "../Modal/AssignMemberModal";

function LeadsOverview() {
	const Option = Select;
	const [toggleForm, setToggleForm] = useState(false);
	const [leadDetailId, setLeadDetailId] = useState("");
	const [openDetail, setOpenDetail] = useState(false);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const isSectionDetailLoading = useSelector(
		state => state.leadMangerSlice.isSectionDetailLoading
	);
	const leadManagerSectionDetailData = useSelector(
		state => state.leadMangerSlice.leadManagerSectionDetailData
	);
	const leadManagerDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail
	);
	const isAssignMemberModalOpen = useSelector(
		state => state.leadMangerSlice.isAssignMemberModalOpen
	);

	const loading = useSelector(state => state.leadMangerSlice.loading);
	const dispatch = useDispatch();

	useEffect(() => {
		if (leadDetailId) {
			dispatch(getLeadManagerDetailById(leadDetailId));
		}
	}, [leadDetailId]);

	const getUniqueListBy = (arr, key) => {
		return [...new Map(arr.map(item => [item[key], item])).values()];
	};
	const handleSelectedMembers = (val, obj) => {
		const tempObj = obj.map(member => {
			return {
				...member.member,
			};
		});
		let unique = getUniqueListBy([...selectedMembers, ...tempObj], "id");
		setSelectedMembers([...unique]);
		// let tempArrObj = selectedMembers.map(member => ({
		// 	detailId: assignToMemberId,
		// 	memberId: member.id,
		// }));

		dispatch(
			addLeadManagerAssignTo([
				{
					detailId: assignToMemberId,
					memberId: tempObj[0].id,
				},
			])
		);
	};

	const onFinish = values => {
		let tempObj = {
			image: {
				id: DEFAULT_GUID,
				file: null,
			},
			...values,
		};
		dispatch(addLeadManagerDetail(jsonToFormData(tempObj)));
	};

	const handleToggleForm = () => {
		setToggleForm(!toggleForm);
	};
	const handleDeleteMember = id => {
		let filteredMembers = selectedMembers.filter(
			member => member.id !== id
		);
		setSelectedMembers([...filteredMembers]);
	};

	const handleSectionChange = (currentSectionId, targetSectionId) => {
		dispatch(
			moveLeadManagerDetail({
				currentSectionId,
				targetSectionId,
				currentIndexNo: 1,
				targetIndexNo: 1,
			})
		);
	};
	const assignToMemberId = useSelector(
		state => state.leadMangerSlice.assignToMemberId
	);
	useEffect(() => {
		if (selectedMembers.length > 0) {
		}
	}, [JSON.stringify(selectedMembers)]);
	return (
		<>
			<div className="flex flex-1 gap-10 my-5 w-[calc(100%-80px)]">
				<section className="basis-1/2 flex gap-5 flex-col">
					<CardButton
						className={"text-gray-400"}
						icon={<PlusOutlined className="!text-gray-500" />}
						onClick={handleToggleForm}
					/>
					{toggleForm && (
						<SectionForm
							onFinish={onFinish}
							handleToggleForm={handleToggleForm}
							list={true}
						/>
					)}
					<div className="rounded">
						{leadManagerDetail?.sections.map(detail => (
							<>
								{detail.details.map(det => (
									<div
										className="mb-2 px-3 py-2 rounded text-white cursor-pointer"
										style={{ background: detail.colorCode }}
										onClick={() => {
											setOpenDetail(true);
											setLeadDetailId(det.id);
										}}
									>
										<div className="flex items-center gap-3">
											<Avatar
												src={det.image}
												className="!bg-black !min-w-[32px]"
											>
												{getNameForImage(det.name)}
											</Avatar>

											<div className="flex flex-col gap-3 w-full">
												<div className="flex justify-between">
													<div className="flex flex-col gap-2">
														<div>{det.name}</div>
														<div className="text-xs">
															{det.address}
														</div>
													</div>
													<div
														className="px-2 bg-neutral-100 rounded flex justify-center items-center font-bold"
														style={{
															color:
																detail.colorCode,
														}}
													>
														{det.typeId === 1
															? "Business"
															: "Individual"}
													</div>
												</div>
												<div className="flex items-center justify-between">
													<Tooltip title="Select Assign Members">
														<div className="bg-primary-color rounded-full p-1 flex items-center">
															<PlusOutlined
																className="!text-[15px] !cursor-pointer !text-white"
																onClick={e => {
																	e.stopPropagation();
																	e.preventDefault();
																	dispatch(
																		handleAssignMemberModal(
																			{
																				id:
																					det.id,
																			}
																		)
																	);
																}}
															/>
														</div>
													</Tooltip>
													<div>
														<Select
															defaultValue={
																det?.sectionId
															}
															dropdownStyle={{
																minWidth:
																	"max-content",
															}}
															onClick={e => {
																e.stopPropagation();
																e.preventDefault();
															}}
															onChange={value => {
																console.log(
																	"value",
																	value,
																	det?.sectionId
																);
																handleSectionChange(
																	det?.sectionId,
																	value
																);
															}}
														>
															{leadManagerDetail?.sections.map(
																leadSection => (
																	<Option
																		value={
																			leadSection.id
																		}
																		key={
																			leadSection.id
																		}
																	>
																		<Tag
																			color={
																				leadSection.colorCode
																			}
																		>
																			{
																				leadSection.name
																			}
																		</Tag>
																	</Option>
																)
															)}
														</Select>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</>
						))}
					</div>
				</section>
				<section className="basis-1/2 ">
					{openDetail && (
						<div className="p-4 px-3 bg-white rounded w-full mb-2 text-semi-bold">
							Details
						</div>
					)}
					{openDetail ? (
						isSectionDetailLoading &&
						!leadManagerSectionDetailData ? (
							<SectionDetailSkeleton />
						) : (
							<div className="bg-white p-5 rounded">
								<SectionDetail
									handleContactDetailModal={() => {}}
									handleMemberModal={() => {}}
									data={leadManagerSectionDetailData}
									onClickContact={() => {}}
									loading={loading}
								/>
							</div>
						)
					) : null}
				</section>
			</div>
			<CustomModal
				isModalVisible={isAssignMemberModalOpen}
				onCancel={() => {
					dispatch(handleAssignMemberModal({ id: "" }));
				}}
				title="Assign Members"
				footer={null}
				children={
					<AssignMemberModal
						defaultData={leadManagerDetail?.members}
						onChange={handleSelectedMembers}
						placeholder="Search Members"
						selectedMembers={selectedMembers}
						handleDeleteMember={handleDeleteMember}
					/>
				}
				className={""}
			/>
		</>
	);
}

export default LeadsOverview;
