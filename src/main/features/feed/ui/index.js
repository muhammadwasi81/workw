import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer/index";
import "./stylesheet/NewsFeed.css";
import "./stylesheet/EventBox.css";
import Header from "./header";
import PostComposer from "./composer";
import PostsList from "./posts_list";

const NewsFeed = () => (
	<TabbableContainer>
		<Header />
		<ContBody>
			<div className="lf-col">
				<div className="newsFeed">
					<PostComposer />
					<PostsList />
				</div>
			</div>
			<div className="rt-col">
				<h1>Right Column</h1>
			</div>
		</ContBody>
	</TabbableContainer>
);

export default NewsFeed;
