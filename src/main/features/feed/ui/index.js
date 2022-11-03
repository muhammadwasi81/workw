import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer/index";
import "./stylesheet/NewsFeed.css";
import "./stylesheet/EventBox.css";
import Header from "./header";
import PostComposer from "./composer";
import PostsList from "./posts_list";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useContext } from "react";
import { FeedDictionary } from "../localization";
import Scheduler from "../../schedule/view/scheduler";
import {
	defaultUiid,
	ReactionModuleEnum,
} from "../../../../utils/Shared/enums/enums";
import { PostReferenceType } from "../utils/constants";
import scheduleIcon from "../../../../content/NewContent/Documents/file/quickIcons/schedulePlus.svg";
import taskPlusIcon from "../../../../content/NewContent/Documents/file/quickIcons/taskPlus.svg";
import expensePlusIcon from "../../../../content/NewContent/Documents/file/quickIcons/expensePlus.svg";
import milePersatationIcon from "../../../../content/NewContent/Documents/file/quickIcons/mile-persatation plus.svg";
import mileboardPlusIcon from "../../../../content/NewContent/Documents/file/quickIcons/mileboardPlus.svg";
import milegridPlusIcon from "../../../../content/NewContent/Documents/file/quickIcons/milegridPlus.svg";
import milepadPlusIcon from "../../../../content/NewContent/Documents/file/quickIcons/milepadPlus.svg";

const NewsFeed = ({
	referenceType = PostReferenceType.MAIN_FEED,
	referenceId = defaultUiid,
	reactionModule = ReactionModuleEnum.Feed,
	isScheduler = true,
	isCheckedIn,
	width = "",
	backButton,
	routeLink,
}) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = FeedDictionary[userLanguage];
	return (
		<TabbableContainer>
			<Header
				isCheckedIn={isCheckedIn}
				width={width && width}
				backButton={backButton}
				routeLink={routeLink}
			/>
			<ContBody
				style={{ direction: Direction }}
				className={width && width}
			>
				<div className="lf-col" style={{ direction: Direction }}>
					<div className="newsFeed">
						<PostComposer
							referenceType={referenceType}
							referenceId={referenceId}
						/>

						<PostsList
							referenceType={referenceType}
							referenceId={referenceId}
							reactionModule={reactionModule}
						/>
					</div>
				</div>
				<div
					className="rt-col"
					style={{
						display: "block",
						height: "auto",
						minHeight: "auto",
					}}
				>
					<div className="quickIcons" >
						<img src={scheduleIcon} className="w-[27px]" />
						<img src={taskPlusIcon} className="w-[27px]" />
						<img src={expensePlusIcon} className="w-[27px]" />
						<img src={milePersatationIcon} className="w-[27px]" />
						<img src={mileboardPlusIcon} className="w-[27px]" />
						<img src={milegridPlusIcon} className="w-[27px]" />
						<img src={milepadPlusIcon} className="w-[27px]" />
					</div>
					{isScheduler && (

						<div className="schedule" style={{ height: "60%" }}>
							<Scheduler feed={true} />
						</div>
					)}
				</div>
			</ContBody>
		</TabbableContainer>
	);
};

export default NewsFeed;
