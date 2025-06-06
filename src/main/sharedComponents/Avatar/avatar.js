import React from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import AvatarGroup from "./AvatarGroup";
import SingleItem from "./SingleItem";
// import TagAvatar from "./TagAvatar";
// avatar
function Avatar(props) {
  //   const objProperty =
  //     props.heading === "Agents"
  //       ? "approver"
  //       : props.heading === "Users"
  //       ? "user"
  //       : props.heading.split("s")[0].toLowerCase();

  const objProperty =
    props.heading === "member"
      ? "approver"
      : props.heading.slice(0, props.heading.length - 1).toLowerCase();

  // const name =
  // 	props.membersData?.length > 0 &&
  // 	props.membersData[0][objProperty] !== null &&
  // 	props.membersData[0][objProperty] !== undefined &&
  // 	props.membersData[0][objProperty]?.name;
  // const image =
  // 	props.membersData?.length > 0 &&
  // 	props.membersData[0][objProperty] !== null &&
  // 	props.membersData[0][objProperty] !== undefined &&
  // 	props.membersData[0][objProperty]?.image;
  return (
    <>
      {props.membersData && props.membersData.length > 0 ? (
        <AvatarGroup
          membersData={props.membersData}
          heading={props.heading}
          nestedObjProperty={objProperty}
          size={props.size}
        />
      ) : (
        <SingleItem data={props.membersData} />
      )}
    </>
  );
}

export default Avatar;
