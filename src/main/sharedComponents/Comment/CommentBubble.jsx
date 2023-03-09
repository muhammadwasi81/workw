import moment from 'moment';
import { renderTitleWithMentions } from '../../../utils/base';
import Avatar from '../Avatar/avatarOLD';

function CommentBubble({
  user,
  content,
  mentionedUser,
  date,
  attachments,
  attachmentCount,
  attachmentFile,
  type,
  comments,
}) {
  const { name, designation = '', userImage: image = '' } = user;
  let ts = moment.utc(date);
  ts.local().format('D-MMM-Y');

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {type !== 2 && (
        <Avatar
          src={comments[0]?.creator?.image || image}
          name={comments[0]?.creator?.name || name}
          size={30}
          round={true}
        />
      )}
      {type === 2 && (
        <div className="commentName">
          <Avatar
            src={comments[0]?.creator?.image}
            name={comments[0]?.creator?.name}
            size={25}
            round={true}
          />
          <div className="nameText">{comments[0]?.creator?.name || name}</div>
        </div>
      )}
      <div className="CommentBubble">
        {type !== 2 && (
          <div className="CommentHeader">
            <div className="CommentHeaderDet">
              <div className="name">{comments[0]?.creator?.name || name}</div>
              <div className="designation">
                {comments[0]?.creator?.designation || designation}
              </div>
            </div>
            <div className="CommentHeaderIcon">
              <span className="time">{moment(ts).fromNow()}</span>
            </div>
          </div>
        )}

        <p
          dangerouslySetInnerHTML={{
            __html: renderTitleWithMentions(content, mentionedUser),
          }}
        />
        {attachments?.length > 0 &&
          attachments?.map(({ path, attachmentName }) => (
            <div className="rounded-[20px] overflow-hidden w-auto inline-block">
              <img
                src={path}
                alt={attachmentName}
                className="max-w-[210px] aspect-[9/6]"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentBubble;
