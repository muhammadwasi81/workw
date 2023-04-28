import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotificationStatus } from "../../../../store/appReducer/responsiveSlice";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
// import NewsIcon from "../../../../content/menu/news.png";
import { handleRedirect } from "../utils/functions";
import "./style.css";
import { getIconByFeaturesType } from "../../../../utils/Shared/helper/helpers";
import CustomModal, { ActionType } from "../../../sharedComponents/CustomModal";
import { NOTIFICATION_ENUMS } from "../utils/enums";
import RewardDetailCard from "../../reward/view/DetailCard";
import { toggleModal } from "../../../../utils/Shared/store/slice";
import { useSelector } from "react-redux";

export default function NotificationItem({ item, index }) {
  let { fromUser, featureType, message, referenceId, createDate, type } = item;
  const { isModalOpen } = useSelector((state) => state.sharedSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let notiTime = moment
    .utc(createDate)
    .local()
    .fromNow();
  const handleClick = () => {
    dispatch(setNotificationStatus(false));
    if (featureType === NOTIFICATION_ENUMS.FEATURE_ID.REWARD) {
      dispatch(toggleModal());
    } else {
      handleRedirect(featureType, referenceId, navigate);
    }
  };

  const closeModal = () => {
    dispatch(toggleModal());
  };

  return (
    <div
      className={
        "approval_item notification_item " + (index > 4 ? "unread" : "")
      }
      onClick={handleClick}
    >
      <div>
        <Avatar
          src={fromUser.image}
          name={fromUser.name}
          size={40}
          round={true}
          // active={true}
        />
      </div>
      <div className="approval_item_detail">
        <div className="approval_item_detail_child1">
          {fromUser.name}
          {message}
        </div>
        <div className="approval_item_detail_child2">
          <div className="dateTime">
            <div className="shortDesc">{notiTime}</div>
            {/* <div className="shortDesc">TRA-00000012</div> */}
          </div>
        </div>
      </div>
      <div>
        <img
          src={getIconByFeaturesType(1)}
          className="mt-[11px] w-[20px] mr-[5px]"
          alt="#"
        />
      </div>
      <CustomModal
        visible={isModalOpen}
        onCancel={closeModal}
        onOk={closeModal}
        actionType={ActionType.OPEN_MODAL}
        actionData={null}
        content={<RewardDetailCard id={type === 1 && referenceId} />}
      />
    </div>
  );
}
