import React from "react";
import { Link } from "react-router-dom";
import { STRINGS } from "../../../../../../../utils/base";
import Avatar from "../../../../../../sharedComponents/Avatar/avatarOLD";
import starIcon from "./../../../../../../../content/NewContent/NewsFeed/svg/starFill.svg";
import publicIcon from "./../../../../../../../content/NewContent/NewsFeed/svg/public.svg";
import moment from "moment";
import { LockOutlined, ShareAltOutlined } from "@ant-design/icons";

const PostHeader = ({
  creator = {},
  tags = [],
  isPinnedPost,
  createDate,
  privacyId,
}) => {
  const { image, name, designation } = creator;
  const privacy = {
    1: <img src={publicIcon} alt="#" />,
    2: <LockOutlined style={{ color: "#797f85", fontSize: "12px" }} />,
    3: <ShareAltOutlined />,
  };
  var ts = moment.utc(createDate);
  ts.local().format("D-MMM-Y");
  return (
    <div className="post-header">
      {/*<HeadingNew />*/}
      <div className="top-det">
        <Avatar src={image} name={name} width={44} height={44} round={true} />
        <div className="user-det">
          <div className="name">
            <span>
              <Link to={``}>{name}</Link>
            </span>
            {/* Taged Users */}
            {tags.length > 0 && (
              <React.Fragment>
                &ensp;with <span>{tags[tags.length - 1].member.name}</span>
                {tags.length > 1 && (
                  <React.Fragment>
                    &ensp;and&ensp;
                    <span>
                      {tags.length > 2 ? (
                        `${tags.length - 1} Others`
                      ) : (
                        <Link
                          to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${tags[1].id}`}
                        >
                          String
                        </Link>
                      )}
                    </span>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="dtp">
            <div className="d">
              {designation ? designation : "Not Designated"}&nbsp;&#9679;
            </div>
            <div className="t">
              {moment(ts).fromNow()}
              &nbsp;&#9679;
            </div>
            <div className="p">{privacy[privacyId]}</div>
          </div>
        </div>
      </div>
      <div className="pinned-post">
        <img
          alt="#"
          style={!isPinnedPost ? { filter: "saturate(11.5) grayscale(1)" } : {}}
          src={starIcon}
          onClick={() => this.markPinnedPost(false)}
        />
      </div>
    </div>
  );
};

export default PostHeader;
