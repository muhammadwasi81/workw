import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";
// import Avatar from "../../SharedComponent/Avatar/avatar";

export const SideBarListItem = (props) => {
  const sideBarStatus = useSelector((state) => state.sideBarChatSlice.sideBarChatStatus)
  const sideBarChatIsDefault = useSelector((state) => state.sideBarChatSlice.sideBarChatIsDefault)
  let { item: { chatWith } } = props;
  return (
    <div className="sideBarListItem" >
      <div className="sideBarListAvatar" >
        <Avatar src={chatWith?.image} name={chatWith?.name} size={40} round={true} counter={1} />
      </div>
      <div className={`sideBarListName ${sideBarChatIsDefault ? "hideMe" : !sideBarStatus ? "hideSideBarItem" : "unHideSideBarItem"}`}>
        {chatWith?.name}
      </div>
    </div>
  )
}

export default SideBarListItem;