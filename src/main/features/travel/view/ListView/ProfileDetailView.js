import React from "react";
import { Avatar } from "antd";
import moment from "moment";
import { BiWorld } from "react-icons/bi";
import { LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { getNameForImage } from "../../../../../utils/base";

function ProfileDetailView(props) {
  const { showIcon = true } = props;
  // console.log(props.name, "props name");
  return (
    <div className="flex items-center gap-1">
      <Avatar
        src={props.profileImgSrc}
        size={props.profileImgSize}
        className="!bg-black"
      >
        {getNameForImage(props.name)}
      </Avatar>
      <div>
        <span className="text-primary-color font-bold text-sm">
          {props.name}
        </span>
        <span className="flex items-center text-center text-xs text-slate-500">
          {props.destination}&nbsp;&#9679;&nbsp;
          {moment
            .utc(props.createDate)
            .local()
            .fromNow()}
          {showIcon && (
            <>
              &nbsp;&#9679;&nbsp;
              {props.isPublic ? <BiWorld /> : <LockOutlined />}
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default ProfileDetailView;
ProfileDetailView.propTypes = {
  name: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  createDate: PropTypes.string.isRequired,
  profileImgSrc: PropTypes.string.isRequired,
  profileImgSize: PropTypes.number.isRequired,
  destination: PropTypes.string.isRequired,
};
ProfileDetailView.defaultProps = {};
