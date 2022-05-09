import React, { useState } from "react";
// import "./index.css";
import CModal from "../../../sharedComponents/CModal/CModal";
import PostHeader from "./PostHeader";
import ComposerForm from "./ComposerForm";

const Composer = props => {
	const { show, onClose, userIcon, userName = "Shoaib Raza" } = props;
	const [shareWith, setShareWith] = useState([]);

	return (
		<>
			{/* <h1 className="text-xl">abcd</h1> */}
			<CModal width={800} show={show} onClose={onClose}>
				<div className="composer-wrapper">
					<PostHeader
						userIcon={userIcon}
						userName={userName}
						shareWith={shareWith}
					/>
					<ComposerForm setShareWith={setShareWith} />
				</div>
			</CModal>
		</>
	);
};

export default Composer;
