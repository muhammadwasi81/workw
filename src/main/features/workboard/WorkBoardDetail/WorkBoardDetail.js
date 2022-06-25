import {
	CheckSquareOutlined,
	PaperClipOutlined,
	PictureOutlined,
	TagOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import React from "react";
import {
	ContBody,
	TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import MemberCollapse from "../../../sharedComponents/Collapseable/MemberCollapse";
import TrelloThemeButton from "../UI/TrelloThemeButton";
import WBDCoverImage from "./WBDCoverImage";
import WorkBoardDescription from "./WorkBoardDescription";

function WorkBoardDetail() {
	return (
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
									{/* <TrelloThemeButton
										text={"Members"}
										icon={<UserAddOutlined />}
									/> */}
									<MemberCollapse />
									<TrelloThemeButton
										text={"Label"}
										icon={<TagOutlined />}
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
	);
}

export default WorkBoardDetail;
