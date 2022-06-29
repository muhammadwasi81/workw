import React, { useState } from "react";

import {
	CheckSquareOutlined,
	PaperClipOutlined,
	PictureOutlined,
	TagOutlined,
} from "@ant-design/icons";

import {
	ContBody,
	TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import MemberCollapse from "../../../sharedComponents/Collapseable/MemberCollapse";

import TrelloThemeButton from "../UI/TrelloThemeButton";
import WBDCoverImage from "./WBDCoverImage";
import WorkBoardDescription from "./WorkBoardDescription";
import MemberModal from "../Modal/MemberModal";
import LabelModal from "../Modal/LabelModal/LabelModal";

function WorkBoardDetail() {
	const [members, setMembers] = useState([]);
	const [label, setLabel] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);

	const showLabelModal = () => {
		setIsLabelModalVisible(!isLabelModalVisible);
	};
	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const onSave = members => {
		setIsModalVisible(false);
		setMembers(members);
	};
	return (
		<>
			<TabContainer>
				<ContBody className="!block">
					<div className="p-5 bg-white rounded-xl mt-5">
						<div className="flex flex-col gap-5">
							<WBDCoverImage />
							<div className="flex gap-5 justify-between">
								<div className="basis-9/12">
									<WorkBoardDescription />
								</div>
								<div className="basis-2/12">
									<div className="flex flex-col gap-5">
										<MemberCollapse
											handleAdd={showModal}
											data={members}
											ghost={false}
										/>
										<TrelloThemeButton
											text={"Label"}
											icon={<TagOutlined />}
											onClick={showLabelModal}
										/>
										<TrelloThemeButton
											text={"Check List"}
											icon={<CheckSquareOutlined />}
										/>
										<TrelloThemeButton
											text={"Dates"}
											icon={<TagOutlined />}
										/>
										<TrelloThemeButton
											text={"Attachment"}
											icon={<PaperClipOutlined />}
										/>
										<TrelloThemeButton
											text={"Cover"}
											icon={<PictureOutlined />}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ContBody>
			</TabContainer>
			<MemberModal
				onSave={onSave}
				showModal={showModal}
				isModalVisible={isModalVisible}
			/>
			<MemberModal
				onSave={onSave}
				showModal={showModal}
				isModalVisible={isModalVisible}
			/>
			<LabelModal
				showLabelModal={showLabelModal}
				isLabelModalVisible={isLabelModalVisible}
			/>
		</>
	);
}

export default WorkBoardDetail;
