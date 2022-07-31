import { Dropdown } from "antd";
import { PostPrivacyType } from "../../../utils/Shared/enums/enums";
import "./privacyOption.css";
export default function PrivacyOptions({ onPrivacyChange, privacyId, labels }) {
	return (
		<Dropdown
			trigger={["click"]}
			overlay={PostPrivacyOptionsMenu(onPrivacyChange, labels)}
		>
			<button className="dropdown-button">
				<img src={PostPrivacyType.getPostTypeIcon(privacyId)} alt="" />
			</button>
		</Dropdown>
	);
}

function PostPrivacyOptionsMenu(onPrivacyChange, labels) {
	return (
		<div className="dropdown-wrapper">
			<div onClick={() => onPrivacyChange(PostPrivacyType.PUBLIC)}>
				<img
					src="https://konnect.im/static/media/world.f69f1142.svg"
					alt=""
				/>
				<span>{labels ? labels.public : "Public"}</span>
			</div>
			<div onClick={() => onPrivacyChange(PostPrivacyType.PRIVATE)}>
				<img
					src="https://konnect.im/static/media/padlock.35a2d6ca.svg"
					alt=""
				/>
				<span>{labels ? labels.private : "Private"}</span>
			</div>
		</div>
	);
}
