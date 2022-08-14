import React, { useState } from "react";
import { Avatar, Button, Collapse, Form, Input } from "antd";
import { FaGlobe, FaUserAlt, FaUserPlus } from "react-icons/fa";
import {
	CalendarOutlined,
	DeleteFilled,
	EnvironmentFilled,
	MailFilled,
	PhoneFilled,
} from "@ant-design/icons";

import "./sectionDetail.css";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";

const { Panel } = Collapse;

function SectionDetail(props) {
	const { data } = props;

	return (
		<div className="flex gap-5">
			<section className="flex flex-col gap-3 basis-7/12">
				<div className="">
					<img
						className="object-cover h-[200px] w-full rounded-2xl"
						src={
							data.image
								? data.image
								: "https://gocrm.io/wp-content/uploads/2020/09/lead-management.jpg"
						}
						alt="lead manager"
					/>
				</div>
				<Form
					name="basic"
					autoComplete="off"
					layout="vertical"
					initialValues={{ ...data }}
				>
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
						name="email"
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
						name="emailAddress"
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
							className=" site-collapse-custom-panel"
							showArrow={false}
							extra={
								<FaUserPlus
									className="!text-white !text-base"
									onClick={e => {
										e.preventDefault();
										e.stopPropagation();
										props.handleContactDetailModal();
									}}
								/>
							}
						>
							{data.members.length > 0 ? (
								data.members.map(member => (
									<div className="bg-white rounded-lg p-2">
										<div className="flex items-center justify-between  w-full">
											<div className="flex gap-3 items-center">
												<Avatar src="" />
												<p className="text-black !m-0">
													Syed Danish Ali
												</p>
											</div>
											<DeleteFilled className="!text-gray-500" />
										</div>
									</div>
								))
							) : (
								<div className="flex justify-center text-primary-color">
									No Contacts
								</div>
							)}
						</Panel>
					</Collapse>
				</div>

				<div className="bg-white rounded-xl py-2 max-h-96 overflow-y-auto">
					<CommentWrapper
						referenceId={data.id}
						isCommentLoad={true}
						module={7}
					/>
				</div>
			</section>
		</div>
	);
}

export default SectionDetail;
