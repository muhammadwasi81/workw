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
				{isScheduler && (
					<div
						className="rt-col"
						style={{
							display: "block",
							height: "auto",
							minHeight: "auto",
						}}
					>
						<div className="schedule" style={{ height: "60%" }}>
							<Scheduler />
						</div>
					</div>
				)}
			</ContBody>
		</TabbableContainer>
	);
};

export default NewsFeed;
