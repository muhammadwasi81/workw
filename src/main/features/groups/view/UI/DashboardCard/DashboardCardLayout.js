import { Card } from 'antd';
import Avatar from '../../../../../sharedComponents/Avatar/avatar';
import PublicPrivateIcon from '../../../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon';
import { useSelector, useDispatch } from 'react-redux';
import QuickOptions from '../../../quickOptions/index';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { handleFavoriteMark } from '../../../store/slice';
import { addGroupFavoriteMarkAction } from '../../../store/actions';
const { Meta } = Card;

function DashboardCardLayout({
  data = {},
  defaultImg,
  loading = false,
  handleUpdate = () => {},
  getDetailById = () => {},
  onClick = () => {},
  dictionary = {},
  chatIcon,
}) {
  const dispatch = useDispatch();

  const menuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFavorite = () => {
    const payload = {
      id: data.id,
      isPinned: !data.isFavorite,
    };
    dispatch(handleFavoriteMark(payload));
    dispatch(addGroupFavoriteMarkAction(payload));
  };
  return (
    <>
      <Card
        cover={
          <img
            alt="example"
            className="object-cover"
            src={data.image ? data.image : defaultImg}
          />
        }
        className="Card2"
        hoverable
        // onClick={onClick}
      >
        <Meta
          className="w-full"
          title={data.name}
          description={
            <div className="flex items-center gap-1 w-full">
              <PublicPrivateIcon id={data.privacyId} />{' '}
              <div className="flex items-center justify-between w-full">
                <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px]">
                  {data.description}
                </span>
              </div>
            </div>
          }
        />

        <div className="flex justify-between items-center">
          <div className="members">
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={'Members'}
              membersData={data.members ? data.members : []}
            />
          </div>
          {/* {userId === data.createBy && (
            <div
              className="flex items-center gap-1 p-1 rounded-sm bg-neutral-100 !text-primary-color hover:bg-neutral-200 transition"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                getDetailById(data.id);
                handleUpdate();
              }}
            >
              {dictionary?.labels?.update}
            </div>
          )} */}
          <div className="flex justify-end">
            <div className={`halfHeader `}>
              <img src={chatIcon} alt="chatIcon" loading="lazy" width={20} />
            </div>
            <div
              onClick={handleFavorite}
              className="relative bottom-2 right-1 mr-1 mt-1"
            >
              {data.isFavourite ? (
                <StarFilled className="!text-[18px] !text-yellow-400 cursor-pointer" />
              ) : (
                <StarOutlined className="!text-[18px] cursor-pointer !text-[#707070]" />
              )}
            </div>
            <QuickOptions data={data} onClick={(e) => menuHandler(e)} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default DashboardCardLayout;
