import moment from "moment";
import { renderTitleWithMentions } from "../../../utils/base";
import Avatar from "../Avatar/avatarOLD";
import { commentTypeEnum } from "./enum/enum";

function CommentBubble({
  user,
  content,
  mentionedUser,
  date,
  attachments,
  attachmentCount,
  attachmentFile,
  type,
  creator,
}) {
  console.log(content, "contentttt");
  console.log(mentionedUser, "contentttt");
  console.log(
    renderTitleWithMentions(content, mentionedUser),
    "renderTitleWithMentions(content, mentionedUser)"
  );
  const { name, designation = "", userImage: image = "" } = user;
  let ts = moment.utc(date);
  ts.local().format("D-MMM-Y");

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {type !== commentTypeEnum.SystemComment && (
        <Avatar
          src={creator?.image ? creator?.image : image}
          name={creator?.name ? creator?.name : name}
          size={30}
          round={true}
        />
      )}
      {type === commentTypeEnum.SystemComment && (
        <div className="commentName">
          <Avatar
            src={creator?.image || image}
            name={creator?.name || name}
            size={25}
            round={true}
          />
          <div className="nameText">{creator?.name || name}</div>
        </div>
      )}
      <div className="CommentBubble">
        {type !== commentTypeEnum.SystemComment && (
          <div className="CommentHeader">
            <div className="CommentHeaderDet">
              <div className="name">{creator?.name || name}</div>
              <div className="designation">
                {creator?.designation || designation}
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
        {/* <div>{renderTitleWithMentions(content, mentionedUser)}</div> */}
        {attachmentFile && (
          <div className="rounded-[20px] overflow-hidden w-auto inline-block">
            <img
              src={URL.createObjectURL(attachmentFile)}
              // altt={attachmentName}
              className="max-w-[210px] aspect-[9/6]"
            />
          </div>
        )}
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
