import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DocsComposerEnums } from "../../constant";
import { handleCloseDocComposer, uploadFileByDrop } from "../../store/slice";
// import UploadByDrop from "./dropUpload";
import CreateFolder from "./folder";
import MileBoard from "./mileBoard";
import MileGrid from "./mileGrid";
import MilePad from "./milePad";
import Mileshow from "./mileshow";
import FolderMemberUpdate from "./updateMembers/folderMembers";
import UploadDocuments from "./uploadDocuments";

const DocumentComposers = ({ referenceId, referenceType }) => {
	const dispatch = useDispatch();
	const composerState = useSelector(
		state => state.documentSlice.isOpenComposers
	);
	let {
		folder,
		mileboard,
		milegrid,
		milepad,
		mileshow,
		upload,
		updateMembers
	} = composerState;
	const handleCloseComposer = key => {
		dispatch(handleCloseDocComposer(key));
		dispatch(uploadFileByDrop([]));
	};

	console.log(mileboard, "mileboard");

	return (
		<>
			{mileboard &&
				<MileBoard
					isOpen={mileboard}
					handleClose={() =>
						handleCloseComposer(DocsComposerEnums.mileboard)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>}
			{milepad &&
				<MilePad
					isOpen={milepad}
					handleClose={() =>
						handleCloseComposer(DocsComposerEnums.milepad)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>}
			{milegrid &&
				<MileGrid
					isOpen={milegrid}
					handleClose={() =>
						handleCloseComposer(DocsComposerEnums.milegrid)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>}
			{mileshow &&
				<Mileshow
					isOpen={mileshow}
					handleClose={() =>
						handleCloseComposer(DocsComposerEnums.mileshow)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>}
			{upload &&
				<UploadDocuments
					isOpen={upload}
					handleClose={() =>
						handleCloseComposer(DocsComposerEnums.upload)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>}
			{folder &&
				<CreateFolder
					isOpen={folder}
					handleClose={() =>
						handleCloseComposer(DocsComposerEnums.folder)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>}
			<FolderMemberUpdate
				isOpen={updateMembers}
				handleClose={() =>
					handleCloseComposer(DocsComposerEnums.updateMember)
				}
			/>
		</>
	);
};

export default DocumentComposers;
