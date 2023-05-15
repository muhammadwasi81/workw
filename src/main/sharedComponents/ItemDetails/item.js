// import { useNavigate } from "react-router-dom";
import { getNameForImage } from '../../../utils/base';
import { DeleteFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import AvatarOld from '../Avatar/avatarOLD';
import {
  reactions,
} from "../../features/feed/ui/reactions/reactions";

import './style.css';

function Item({ item, handleDelete, isDeleteDisabled = true, onDelete ,isReaction=false }) {
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
          src={(item.member?.image?.length && item.member?.image) || (item.user?.image?.length && item.user?.image)}
        >
          {(item.member && getNameForImage(item.member.name && item.member.name)) || (item?.user && getNameForImage(item?.user?.name && item?.user?.name))}
        </Avatar>
      </div>

      <div className="flex flex-auto justify-between">
        <div className="contentBox">
          <p style={{ color: '#222222' }}>{(item?.member && item?.member?.name) || (item?.user && item?.user?.name) }</p>
          <p style={{ color: 'rgb(117, 125, 134)' }} className="member-email">
            {(item.member && item.member.email) || (item?.user && item?.user?.email)}
          </p>
        </div>
        {!isDeleteDisabled && (
          <DeleteFilled
            className=""
            style={{ color: '#000000' }}
            onClick={(e) => onDeleteFunc(e, item.member.id)}
          />
        )}
        {isReaction && (<img
              className="w-[30px] h-[30px] rounded-full cursor-pointer ml-auto"
              src={reactions[item?.reactionType]}
              alt="profile"
            />)}
      </div>
    </div>
  );
}

export default Item;
