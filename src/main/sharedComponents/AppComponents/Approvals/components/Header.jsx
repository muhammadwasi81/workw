import Avatar from "../../../Avatar/avatarOLD";
import { Tag } from "antd";
import { statusEnum, statusObj } from "../enums";
function Header({ user, type: typeNo = 1, status = 1 }) {
  const type = statusObj[typeNo];
  const { label, color } = statusEnum[type][status - 1];
  const { name, designation, image } = user;

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
