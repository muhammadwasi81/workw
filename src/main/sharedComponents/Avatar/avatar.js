import React from 'react';
import PropTypes from 'prop-types';
import AvatarGroup from './AvatarGroup';
import TagAvatar from './TagAvatar';
// avatar
function Avatar(props) {
  const objProperty =
    props.heading === 'Agents'
      ? 'approver'
      : props.heading.split('s')[0].toLowerCase();
  const name =
    props.membersData.length > 0 &&
    props.membersData[0][objProperty] !== null &&
    props.membersData[0][objProperty] !== undefined &&
    props.membersData[0][objProperty].name;
  const image =
    props.membersData.length > 0 &&
    props.membersData[0][objProperty] !== null &&
    props.membersData[0][objProperty] !== undefined &&
    props.membersData[0][objProperty].image;
  console.log(image, 'image');
  // console.log("name", name);
  // console.log("membersdata", props.membersData);
  // console.log("image", image);
  // console.log("heading", props.heading);
  // console.log("obje property", objProperty);
  return (
    <div>
      {props.membersData && (
        <AvatarGroup
          membersData={props.membersData}
          heading={props.heading}
          nestedObjProperty={objProperty}
          size={props.size}
          // dummyImage={props.image}
        />
      )}
    </div>
  );
}

export default Avatar;
