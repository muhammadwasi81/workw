import React, { useContext, useState } from "react";
import systemLogo from "../../../content/systemLogo.png";
import privacyPolicy from "../../../content/file/privacyPolicy.pdf";
import termsAndCondition from "../../../content/file/termandcondition.pdf";
// import ViewerModal from "../../SharedComponent/Viewer/viewerModal";
// import FeedBackComposer from "./feedBackComposer";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";

const NavFooter = ({ navbarstatus }) => {
	const [path, setPath] = useState(null);
	const [openView, SetOpenView] = useState(false);
	const [openFeedBackComposer, setOpenFeedBackComposer] = useState(false);
	const { userLanguage } = useContext(LanguageChangeContext);
	const localDictionary = dictionaryList[userLanguage];
	const closeViewerModal = () => {
		setPath("");
		SetOpenView(false);
	};
	const closeFeedBackComposer = () => {
		setOpenFeedBackComposer(false);
	};

	return (
		<React.Fragment>
			{/* {openView && (
				<ViewerModal path={path} closeViewerModal={closeViewerModal} />
			)} */}
			{/* {openFeedBackComposer && (
				<FeedBackComposer
					isDialogOpen={openFeedBackComposer}
					cancel={closeFeedBackComposer}
					text={"Type your remarks"}
					//handleAddComment={this.handleFeedBack}
				/>
			)} */}
			<div
				className="nav-footer"
				style={{ display: navbarstatus ? "flex" : "none" }}
			>
				<div className="system-logo">
					<img src={systemLogo} alt="#" />
				</div>
				<div className="system-about">
					<div>
						<div
							className="lnk"
							onClick={() => {
								setPath(privacyPolicy);
								SetOpenView(true);
							}}
						>
							{localDictionary.navMenuLabel.privacy}
							<span className="dot" />
						</div>

						<div
							className="lnk"
							style={{ whiteSpace: "nowrap" }}
							onClick={() => {
								setPath(termsAndCondition);
								SetOpenView(true);
							}}
						>
							{localDictionary.navMenuLabel.TC}
							<span className="dot" />
						</div>
					</div>
					<div>
						<div
							className="lnk"
							onClick={() => window.open("https://miletap.com")}
						>
							{localDictionary.navMenuLabel.more}
							<span className="dot" />
						</div>
						<div className="system-feed-back lnk">
							<div onClick={() => setOpenFeedBackComposer(true)}>
								{localDictionary.navMenuLabel.feedBack}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default NavFooter;
