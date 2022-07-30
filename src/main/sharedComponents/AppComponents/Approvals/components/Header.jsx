import { Tag } from "antd";
import Avatar from "../../../Avatar/avatarOLD";
import { getStatusLabelAndColor } from "../enums";
function Header({ user, type, status }) {
  const { name, designation, image } = user;
  const { label, color } = getStatusLabelAndColor()[status];

  return (
    <div className="approval__body-header">
      <div className="left">
        <Avatar src={image && image} round width={"30px"} height={"30px"} />
        <div className="userDetail">
          <span className="username">{name}</span>
          <span className="designation">{designation}</span>
        </div>
      </div>
      <div className="right">
        <Tag style={{ background: color }}>{label}</Tag>
      </div>
    </div>
  );
}

export default Header;
