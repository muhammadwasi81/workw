import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../../../sharedComponents/Avatar/avatarOLD';
import { useMediaQuery } from 'react-responsive';

const PostHeader = () => {
  const { tags } = useSelector(({ feedSlice }) => feedSlice.postCompose);
  const isExtraSmall = useMediaQuery({ query: `(max-width: 600px)` });

  const {
    userSlice: {
      user: { name, userImage },
    },
  } = useSelector((state) => state);
  console.log(tags, 'tags');
  return (
    <>
      <div className="avatar-wrapper">
        <Avatar
          width={isExtraSmall ? 33 : 40}
          height={isExtraSmall ? 33 : 40}
          src={userImage}
          name={name}
          round
        />
        {/* <img src={userImage} alt="" className="user-thumb" /> */}
        <div className="user-name">
          <h3>{name}</h3>
          {tags.length > 0 && (
            <>
              <span>with</span>
              <h3 className="tagged-users">{tags[0].name}</h3>
              <span>
                {tags.length >= 2 ? `and ${tags.length - 1} others` : ''}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostHeader;
