import Avatar from "../../../Avatar/avatarOLD";
import { Tag } from "antd";
import { statusEnum } from "../enums";
function Header({ user, type = "Approvers", status = 1 }) {
  const { name, designation, image } = user;
  const { label, color } = statusEnum[type][status - 1];

  return (
    <div className="approval__body-header">
      <div className="left">
        <Avatar
          src={image && image}
          size={40}
          round
          width={"30px"}
          height={"30px"}
        />
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
