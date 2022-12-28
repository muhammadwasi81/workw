import React, { useContext, useRef } from 'react';
import './stylesheet/FeedCompose.css';
// import frameIcon from "../../../../../content/NewContent/NewsFeed/svg/image.svg";
// import penIcon from "../../../../../content/NewContent/NewsFeed/svg/pen.svg";
// import chartIcon from "../../../../../content/NewContent/NewsFeed/svg/chart.svg";
import photo from '../../../../../content/NewContent/NewsFeed/svg/post_img_icon.svg';
import doc from '../../../../../content/NewContent/NewsFeed/svg/post_doc_icon.svg';
import poll from '../../../../../content/NewContent/NewsFeed/svg/post_poll_icon.svg';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import PostHeader from './views/PostHeader';
import ComposerForm from './views/ComposerForm';
// import CModal from "../../../../sharedComponents/CModal/CModal";
import store from '../../../../../store/store';
import { feedSlice } from '../../store/slice';
import { useSelector } from 'react-redux';
import { Modal, Tooltip } from 'antd';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { FeedDictionary } from '../../localization';

function PostComposer({ referenceType, referenceId }) {
  const { showComposer, type } = useSelector(
    (state) => state.feedSlice.postCompose
  );
  const { userSlice } = useSelector((state) => state);
  const { name, userImage } = userSlice.user;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { composer, Direction } = FeedDictionary[userLanguage];
  const { Whatsonyourmind } = composer;
  const toggleComposer = (visibility) => {
    store.dispatch(feedSlice.actions.toggleComposerVisibility({ visibility }));
  };
  const imageVideoRef = useRef();
  const docsRef = useRef();
  const pollRef = useRef();

	return (
		<>
			<div className="newsComposer">
				<div className="composer">
					<div className="user">
						<Avatar
							src={userImage}
							className="addPostAvatar"
							name={name}
							width={44}
							height={44}
							round={true}
						/>
						<div className="name">
							<span>{name}</span>
						</div>
					</div>
					<div
						className="text-area"
						onClick={() => toggleComposer(true)}
					>
						{Whatsonyourmind}
					</div>
					<div
						className="feedIcons cursor-pointer"
						style={{ display: "flex" }}
						onClick={() => toggleComposer(true)}
					>
						<Tooltip
							title="Add Image/Video"
							color="var(--currentThemeColor)"
						>
							<img
								src={photo}
								alt="photo"
								className="hover:shadow-md hover:scale-125 transition-all"
								onClick={() => {
									setTimeout(() => {
										imageVideoRef.current.click();
									}, 100);
								}}
							/>
						</Tooltip>
						<Tooltip
							title="Add Documents"
							color="var(--currentThemeColor)"
						>
							<img
								src={doc}
								alt="doc"
								className="hover:shadow-md hover:scale-125 transition-all"
								onClick={() => {
									setTimeout(() => {
										docsRef.current.click();
									}, 100);
								}}
							/>
						</Tooltip>
						<Tooltip
							title="Add Polls"
							color="var(--currentThemeColor)"
						>
							<img
								src={poll}
								alt="poll"
								className="hover:shadow-md hover:scale-125 transition-all"
								onClick={() => {
									setTimeout(() => {
										pollRef.current.click();
									}, 100);
								}}
							/>
						</Tooltip>
					</div>
				</div>
				<span className="area-block" />
			</div>
			<Modal
				className={Direction}
				width={800}
				visible={showComposer}
				onCancel={() => {
					if (type !== 1) {
						store.dispatch(
							feedSlice.actions.onPostTypeChange({
								type: 1,
							})
						);
					}
					toggleComposer(false);
				}}
				destroyOnClose
				footer={null}
				header={null}
			>
				<div
					className="composer-wrapper"
					style={{ direction: Direction }}
				>
					<PostHeader />
					<ComposerForm
						referenceType={referenceType}
						referenceId={referenceId}
						imageVideoRef={imageVideoRef}
						pollRef={pollRef}
						docsRef={docsRef}
						isOpen={showComposer}
					/>
				</div>
			</Modal>
		</>
	);
}

export default PostComposer;
