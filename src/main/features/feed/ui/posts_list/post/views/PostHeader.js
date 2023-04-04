import { useState } from 'react';
import { Link } from 'react-router-dom';
import { STRINGS } from '../../../../../../../utils/base';
import Avatar from '../../../../../../sharedComponents/Avatar/avatarOLD';
import publicIcon from './../../../../../../../content/NewContent/NewsFeed/svg/public.svg';
import moment from 'moment';
import {
  LockOutlined,
  ShareAltOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { favoriteFeed } from '../../../../store/actions';
import { addFeedFavourite } from '../../../../store/slice';
import PostTaggedModal from './PostTaggedModal';
import { ROUTES } from '../../../../../../../utils/routes';

const PostHeader = ({
  creator = {},
  tags = [],
  isPinnedPost,
  createDate,
  privacyId,
  id,
}) => {
  const dispatch = useDispatch();
  const { image, name, designation, userActiveStatus } = creator;
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(userActiveStatus, "USER ACTIVE STATUS")

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowModal = () => {
    console.log('open');
    setIsModalOpen(true);
  };

  const privacy = {
    1: <img src={publicIcon} alt="public-icon" />,
    2: <LockOutlined style={{ color: '#797f85', fontSize: '12px' }} />,
    3: <ShareAltOutlined />,
  };

  var ts = moment.utc(createDate);
  ts.local().format('D-MMM-Y');

  return (
    <div className="post-header">
      <div className="top-det">
        <Avatar 
          src={image}
          name={name}
          width={44}
          height={44}
          round={true}
          status={true} />
        <div className="user-det">
          <div className="name">
            <span>
              <Link to={`${ROUTES.USER.DEFAULT}${creator.id}`}>{name}</Link>
            </span>
            {tags.length > 0 && (
              <>
                &nbsp;with <span>{tags[tags.length - 1].member?.name}</span>
                {tags.length > 1 && (
                  <>
                    &nbsp;and&nbsp;
                    <span onClick={handleShowModal}>
                      {tags.length > 2 ? (
                        `${tags.length - 1} Others`
                      ) : (
                        <Link
                          to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${tags[1]?.member?.id}`}
                        >
                          {tags[1]?.member?.name}
                        </Link>
                      )}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          <div className="dtp">
            <div className="d">
              {designation ? designation : 'Not Designated'}
              &nbsp;&#9679;
            </div>
            <div className="t">
              {moment(ts).fromNow()}
              &nbsp;&#9679;
            </div>
            <div className="p">{privacy[privacyId]}</div>
          </div>
        </div>
      </div>
      <div
        className="pinned-post"
        onClick={() => {
          dispatch(addFeedFavourite({ isPinned: !isPinnedPost, id }));
          dispatch(favoriteFeed({ isPinned: !isPinnedPost, id }));
        }}
      >
        {isPinnedPost ? (
          <StarFilled className="!text-[18px] !text-yellow-400 cursor-pointer" />
        ) : (
          <StarOutlined className="!text-[18px] cursor-pointer !text-[#707070]" />
        )}
      </div>
      <PostTaggedModal
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </div>
  );
};

export default PostHeader;
