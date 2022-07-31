import Avatar from "../../../Avatar/avatarOLD";
import { Tag } from "antd";
function Header({ user, type: typeNo, status }) {
  const { name, designation, image } = user;

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
        {/* <Tag style={{ background: color }}>{label}</Tag> */}
      </div>
    </div>
  );
}

export default Header;
