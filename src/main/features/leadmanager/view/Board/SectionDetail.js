import React, { useState } from "react";
import { Avatar, Button, Collapse, Form, Input, Radio, Tag } from "antd";
import { FaGlobe, FaUserAlt, FaUserPlus } from "react-icons/fa";
import {
	CalendarOutlined,
	EnvironmentFilled,
	MailFilled,
	PhoneFilled,
} from "@ant-design/icons";

import "./sectionDetail.css";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import UploadBgImg from "../../../workboard/WorkBoardDetail/UploadBgImg";
import { useDispatch } from "react-redux";
import {
	getAllLeadManagerContactDetail,
	updateLeadManagerDetail,
} from "../../store/actions";
import { getNameForImage, jsonToFormData } from "../../../../../utils/base";

const { Panel } = Collapse;

function SectionDetail(props) {
	const { data } = props;

	const [image, setImage] = useState(
		data.image
			? data.image
			: "https://gocrm.io/wp-content/uploads/2020/09/lead-management.jpg"
	);
	const dispatch = useDispatch();

	const onFinish = values => {
		dispatch(
			updateLeadManagerDetail(
				jsonToFormData({
					image: { id: data.imageId, file: image ? image : null },
					...values,
					id: data.id,
					sectionId: data.sectionId,
				})
			)
		);
	};

	return (
		<div className="flex gap-5">
			<section className="flex flex-col gap-3 basis-7/12">
				<div className="overflow-hidden relative h-[200px]">
					<img
						className="object-cover h-[200px] w-full rounded-2xl"
						src={
							image && image.length > 0
								? image
								: (
										window.URL || window.webkitURL
								  ).createObjectURL(image)
						}
						alt="lead manager"
					/>
					<UploadBgImg
						onUploadImg={value => {
							setImage(value.fileList[0].originFileObj);
						}}
					>
						<div
							className="bg-gray-500 absolute text-white w-full bottom-0 left-0 flex justify-center py-3 bg-opacity-90 rounded-b-2xl cursor-pointer hover:bg-opacity-95 transition hover:font-semibold"
							onClick={() => {
								console.log("upload ");
							}}
						>
							Upload Image
						</div>
					</UploadBgImg>
				</div>
				<Form
					name="basic"
					autoComplete="off"
					layout="vertical"
					initialValues={{ ...data }}
					onFinish={onFinish}
				>
					<Form.Item name="typeId">
						<Radio.Group>
							<Radio value={1}>Business</Radio>
							<Radio value={2}>Individual</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						label={<span className="text-primary-color">Name</span>}
						name="name"
					>
						<Input
							prefix={<FaUserAlt className="text-gray-500" />}
							placeholder="Write Name..."
						/>
					</Form.Item>
					<Form.Item
						name="phoneNumber"
						label={
							<span className="text-primary-color">
								Phone Number
							</span>
						}
					>
						<Input
							prefix={
								<PhoneFilled
									rotate={90}
									className="!text-gray-500"
								/>
							}
							placeholder="Lead Phone Number"
						/>
					</Form.Item>
					<Form.Item
						name="emailAddress"
						label={
							<span className="text-primary-color">Email</span>
						}
					>
						<Input
							// type={"email"}
							prefix={<MailFilled className="!text-gray-500" />}
							placeholder="Lead Email Address"
						/>
					</Form.Item>
					<Form.Item
						name="address"
						label={
							<span className="text-primary-color">Address</span>
						}
					>
						<Input
							prefix={
								<EnvironmentFilled className="!text-gray-500" />
							}
							placeholder="Lead Address"
						/>
					</Form.Item>
					<Form.Item
						name="website"
						label={
							<span className="text-primary-color">Website</span>
						}
					>
						<Input
							prefix={<FaGlobe className="!text-gray-500" />}
							placeholder="Lead Url"
							// type={"url"}
						/>
					</Form.Item>
					<Form.Item className="!mb-0">
						<Button
							htmlType="submit"
							className="ThemeBtn !block ml-auto"
							loading={props.loading}
						>
							Update
						</Button>
					</Form.Item>
				</Form>
			</section>
			<section className="basis-5/12 flex flex-col gap-5">
				<div className="bg-neutral-100 p-2 rounded-lg h-fit">
					<Collapse
						bordered={false}
						defaultActiveKey={["1"]}
						ghost={true}
						expandIconPosition="end"
						className="site-collapse-custom-collapse !overflow-hidden"
					>
						<Panel
							header={
								<p className="text-white w-full !m-0">
									Meetings
								</p>
							}
							key="1"
							className=" site-collapse-custom-panel"
							showArrow={false}
							extra={
								<CalendarOutlined className="!text-white !text-base" />
							}
						>
							<div className="flex justify-center text-primary-color">
								No Meetings
							</div>
						</Panel>
					</Collapse>
				</div>

				<div className="bg-neutral-100 p-2 rounded-lg h-fit">
					<Collapse
						bordered={false}
						defaultActiveKey={["1"]}
						ghost={true}
						expandIconPosition="end"
						className="site-collapse-custom-collapse !overflow-hidden"
					>
						<Panel
							header={
								<p className="text-white w-full !m-0">
									Contacts
								</p>
							}
							key="1"
							className=" site-collapse-custom-panel "
							showArrow={false}
							extra={
								<FaUserPlus
									className="!text-white !text-base"
									onClick={e => {
										e.preventDefault();
										e.stopPropagation();

										props.handleContactDetailModal();
										props.onClickContact(false);
									}}
								/>
							}
						>
							<div className="max-h-60 overflow-y-auto flex flex-col gap-3">
								{data.contacts.length > 0 ? (
									data.contacts.map(contact => (
										<div
											className="bg-white rounded-lg p-2 cursor-pointer hover:bg-primary-color group text-black hover:text-white transition "
											onClick={() => {
												dispatch(
													getAllLeadManagerContactDetail(
														contact.id
													)
												);
												props.handleContactDetailModal();
												props.onClickContact(true);
											}}
										>
											<div className="flex items-center justify-between w-full">
												<div className="flex gap-3 items-center ">
													<Avatar src={contact.image}>
														{getNameForImage(
															contact.name
														)}
													</Avatar>
													<p className=" !m-0">
														{contact.name}
													</p>
												</div>
												<Tag
													color={
														contact.activeStatusId ===
														1
															? `green`
															: `red`
													}
												>
													{contact.activeStatusId ===
													1
														? `Active`
														: `In-Active`}
												</Tag>
												{/* <DeleteFilled
												className="!text-gray-500 cursor-pointer group-hover:!text-white"
												onClick={e => {
													e.preventDefault();
													e.stopPropagation();
													dispatch(
														deleteLeadManagerContact(
															contact.id
														)
													);
												}}
											/> */}
											</div>
										</div>
									))
								) : (
									<div className="flex justify-center text-primary-color">
										No Contacts
									</div>
								)}
							</div>
						</Panel>
					</Collapse>
				</div>

				<div className="bg-white rounded-xl py-2 max-h-96 overflow-y-auto">
					<CommentWrapper
						referenceId={data.id}
						isCommentLoad={true}
						module={7}
						loadSkeleton={true}
					/>
				</div>
			</section>
		</div>
	);
}

export default SectionDetail;
