import { PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Avatar, Select, Tag, Tooltip } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNameForImage, jsonToFormData } from "../../../../../utils/base";
import { DEFAULT_GUID } from "../../../../../utils/constants";
import { leadSectionEnum } from "../../enum/enum";
import { addLeadManagerDetail } from "../../store/actions";
import CardButton from "../../UI/Button/CardButton";
import SectionForm from "./Sections/SectionForm/SectionForm";

function LeadsOverview() {
	const Option = Select;
	const [toggleForm, setToggleForm] = useState(false);
	const dispatch = useDispatch();
	const leadManagerDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail
	);
	const onFinish = values => {
		let tempObj = {
			// sectionId: section.id,
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

	return (
		<div className="flex flex-1  my-5">
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
						<div>
							{detail.details.map(det => (
								<div
									className="mb-2 px-3 py-2 rounded text-white "
									style={{ background: detail.colorCode }}
								>
									<div className="flex items-center gap-3">
										<Avatar
											src={det.image}
											className="!bg-black"
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
														color: detail.colorCode,
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
															// onClick={
															// 	props.handleMemberModal
															// }
														/>
													</div>
												</Tooltip>
												<div>
													<Select value={1}>
														{leadSectionEnum.map(
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
						</div>
					))}
				</div>
			</section>
			<section className="basis-1/2"></section>
		</div>
	);
}

export default LeadsOverview;
