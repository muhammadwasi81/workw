import React, { useState } from "react";
import { Collapse, Form, Input } from "antd";
import { FaGlobe, FaUserAlt } from "react-icons/fa";
import {
	CalendarOutlined,
	EnvironmentFilled,
	MailFilled,
	PhoneFilled,
} from "@ant-design/icons";

const { Panel } = Collapse;

function SectionDetail() {
	return (
		<div className="flex gap-5">
			<section className="flex flex-col gap-3 basis-7/12">
				<div className="">
					<img
						className="object-cover h-[200px] w-full rounded-2xl"
						src="https://gocrm.io/wp-content/uploads/2020/09/lead-management.jpg"
						alt="lead manager"
					/>
				</div>
				<Form name="basic" autoComplete="off" layout="vertical">
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
						name="contactNo"
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
						name="url"
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
				</Form>
			</section>
			<section className="basis-5/12">
				<div className="bg-neutral-100 p-2 rounded-lg h-fit">
					<Collapse
						// onChange={onChange}
						// expandIcon={({ isActive }) => (
						// 	<DownOutlined
						// 		rotate={isActive ? 0 : 180}
						// 		className="!text-lg !font-bold !text-primary-color"
						// 	/>
						// )}
						className="w-full bg-neutral-100"
						ghost={true}
						expandIconPosition={"end"}
						defaultActiveKey={["1"]}
					>
						<Panel
							showArrow={false}
							header={
								<div>
									<span className="text-base font-bold text-white">
										Members
									</span>
								</div>
							}
							extra={<CalendarOutlined className="!text-white" />}
							className="!bg-primary-color !rounded-xl !h-[50px] w-full !pr-0"
							// extra={
							// 	<PlusCircleFilled
							// 		onClick={event => {
							// 			event.stopPropagation();
							// 			handleAdd();
							// 		}}
							// 		className="text-xl font-bold !text-primary-color mr-2"
							// 	/>
							// }
							key="1"
						>
							adsfadsf
						</Panel>
					</Collapse>
				</div>
			</section>
		</div>
	);
}

export default SectionDetail;
