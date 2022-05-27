import {Dropdown} from "antd";
import store from "../../../../../store/store";
import {feedSlice} from "../../store/slice";
import {PostPrivacyType} from "../../utils/constants";
import {useSelector} from "react-redux";

export default function PostPrivacyOptions() {
    const onPrivacyChange = (privacyType) => {
        store.dispatch(feedSlice.actions.onPostPrivacyChange({privacyType}))
    }

    const {privacyType} = useSelector(({feedSlice}) => feedSlice.postCompose);

    return (
        <Dropdown trigger={["click"]} overlay={PostPrivacyOptionsMenu(onPrivacyChange)}>
            <button className="dropdown-button">
                <img
                    src={PostPrivacyType.getPostTypeIcon(privacyType)}
                    alt=""
                />
            </button>
        </Dropdown>
    )
}

function PostPrivacyOptionsMenu(onPrivacyChange) {
    return (
        <div className="dropdown-wrapper">
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
        </div>
    )
}