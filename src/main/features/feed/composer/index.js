import React  from "react";
import CModal from "../../../sharedComponents/CModal/CModal";
import PostHeader from "./views/PostHeader";
import ComposerForm from "./views/ComposerForm";

const Composer = props => {
	const { show, onClose, userIcon, userName = "Shoaib Raza" } = props;

	return (
		<CModal width={800} show={show} onClose={onClose}>
			<div className="composer-wrapper">
				<PostHeader userIcon={userIcon} userName={userName}/>
				<ComposerForm/>
			</div>
		</CModal>
	);
};

export default Composer;
