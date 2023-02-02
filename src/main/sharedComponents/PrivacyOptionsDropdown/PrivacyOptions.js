import { Dropdown } from "antd";
import { PostPrivacyType } from "../../../utils/Shared/enums/enums";
import "./privacyOption.css";
import { BiWorld } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
import PublicPrivateIcon from "../PublicPrivateIcon/PublicPrivateIcon";
import { useEffect, useState } from "react";
export default function PrivacyOptions({ onPrivacyChange, privacyId, labels }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleChange = (e) => {
		setIsOpen(false)
		onPrivacyChange(e);
	}
	return (
		<Dropdown
			trigger={["click"]}
			menu={PostPrivacyOptionsMenu(handleChange, labels)}
			open={isOpen}
		>
			<button className="dropdown-button" onClick={() => setIsOpen(true)}>
				<PublicPrivateIcon
					className="text-xl text-gray-500"
					id={privacyId}
				/>
				{/* <img src={PostPrivacyType.getPostTypeIcon(privacyId)} alt="" /> */}
			</button>
		</Dropdown>
	);
}

function PostPrivacyOptionsMenu(onPrivacyChange, labels) {
	return (
		<div className="dropdown-wrapper">
			<div
				onClick={() => onPrivacyChange(PostPrivacyType.PUBLIC)}
				className="flex items-center gap-2"
			>
				{/* <img
					src="https://konnect.im/static/media/world.f69f1142.svg"
					alt=""
				/> */}
				<BiWorld className="text-xl text-gray-500" />
				<span>{labels ? labels.public : "Public"}</span>
			</div>
			<div
				onClick={() => onPrivacyChange(PostPrivacyType.PRIVATE)}
				className="flex items-center gap-2"
			>
				{/* <img
					src="https://konnect.im/static/media/padlock.35a2d6ca.svg"
					alt=""
				/> */}
				<HiLockClosed className="text-xl text-gray-500" />
				<span>{labels ? labels.private : "Private"}</span>
			</div>
		</div>
	);
}
