import { Dropdown } from "antd";
import { PostPrivacyType } from "../../../utils/Shared/enums/enums";
import "./privacyOption.css";
import { BiWorld } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
import PublicPrivateIcon from "../PublicPrivateIcon/PublicPrivateIcon";
export default function PrivacyOptions({ onPrivacyChange, privacyId, labels }) {
	return (
		<Dropdown
			trigger={["click"]}
			overlay={PostPrivacyOptionsMenu(onPrivacyChange, labels)}
		>
			<button className="dropdown-button">
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
