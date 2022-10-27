import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

function CreateLearningDropdown() {
	const handleChange = value => {
		let { key } = value;
		// dispatch(handleOpenDocComposer(key));
	};
	const CreateOptions = [
		{
			label: <p className="!mb-0 pl-3">Category</p>,
			key: "category",
			onClick: handleChange,
		},
		{
			label: <p className="!mb-0 pl-3">Courses</p>,
			key: "courses",
			onClick: handleChange,
		},
		{
			label: <p className="!mb-0 pl-3">eBook</p>,
			key: "ebook",
			onClick: handleChange,
		},
		{
			label: <p className="!mb-0 pl-3">Quiz</p>,
			key: "quiz",
			onClick: handleChange,
		},
		{
			label: <p className="!mb-0 pl-3">TedTalks</p>,
			key: "tedTalks",
			// icon: <img width="17px" alt="" src={milegridIcon} />,
			onClick: handleChange,
		},
		{
			label: <p className="!mb-0 pl-3">Articles</p>,
			key: "articles",
			// icon: <img width="17px" alt="" src={mileshowIcon} />,
			onClick: handleChange,
		},
		{
			label: <p className="!mb-0 pl-3">Videos</p>,
			key: "video",
			// icon: <img width="17px" alt="" src={mileshowIcon} />,
			onClick: handleChange,
		},
	];
	return (
		<Dropdown overlay={<Menu items={CreateOptions} />} trigger={["click"]}>
			<Button className="primary_btn  ">
				Create
				<DownOutlined className="!text-sm" />
			</Button>
		</Dropdown>
	);
}

export default CreateLearningDropdown;
