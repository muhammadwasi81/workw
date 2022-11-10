import React, { useState } from "react";
import { Dropdown } from "antd";
import { useSelector } from "react-redux";
import store from "../../../../../../store/store";
import { feedSlice } from "../../../store/slice";
import { PostPrivacyType } from "../../../utils/constants";

export default function PostPrivacyOptions() {
	const onPrivacyChange = privacyType => {
		store.dispatch(feedSlice.actions.onPostPrivacyChange({ privacyType }));
	};

	const { privacyType } = useSelector(
		({ feedSlice }) => feedSlice.postCompose
	);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dropdown
			trigger={["click"]}
			open={isOpen}
			overlay={PostPrivacyOptionsMenu(onPrivacyChange, setIsOpen)}
		>
			<button className="dropdown-button" onClick={() => setIsOpen(true)}>
				<img
					src={PostPrivacyType.getPostTypeIcon(privacyType)}
					alt=""
				/>
			</button>
		</Dropdown>
	);
}

function PostPrivacyOptionsMenu(onPrivacyChange, setIsOpen) {
	return (
		<div className="dropdown-wrapper" onClick={() => setIsOpen(false)}>
			<div onClick={() => onPrivacyChange(PostPrivacyType.PUBLIC)}>
				<img
					src="https://konnect.im/static/media/world.f69f1142.svg"
					alt=""
				/>
				<span>Public</span>
			</div>
			<div onClick={() => onPrivacyChange(PostPrivacyType.PRIVATE)}>
				<img
					src="https://konnect.im/static/media/padlock.35a2d6ca.svg"
					alt=""
				/>
				<span>Private</span>
			</div>
			{/* <div onClick={() => onPrivacyChange(PostPrivacyType.EXTERNAL)}>
        <img
          src="https://konnect.im/static/media/padlock.35a2d6ca.svg"
          alt=""
        />
        <span>External</span>
      </div> */}
		</div>
	);
}
