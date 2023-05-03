// import { useNavigate } from "react-router-dom";
import { getNameForImage } from '../../../utils/base';
import { DeleteFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import AvatarOld from '../Avatar/avatarOLD';

import './style.css';

function Item({ item, handleDelete, isDeleteDisabled = true, onDelete }) {
  //   const navigate = useNavigate(); onClick={() => console.log("clicked")}
  //   console.log(item);

  const onDeleteFunc = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className="approverBox">
      <div className="imageBox">
        <Avatar
          className="cursor-pointer !bg-black  imageAvatar"
          src={item.member?.image?.length && item.member?.image}
        >
          {item.member && getNameForImage(item.member.name && item.member.name)}
        </Avatar>
      </div>

      <div className="flex flex-auto justify-between">
        <div className="contentBox">
          <p style={{ color: '#222222' }}>{item.member && item.member.name}</p>
          <p style={{ color: 'rgb(117, 125, 134)' }} className="member-email">
            {item.member && item.member.email}
          </p>
        </div>
        {!isDeleteDisabled && (
          <DeleteFilled
            className=""
            style={{ color: '#000000' }}
            onClick={(e) => onDeleteFunc(e, item.member.id)}
          />
        )}
      </div>
    </div>
  );
}

export default Item;
