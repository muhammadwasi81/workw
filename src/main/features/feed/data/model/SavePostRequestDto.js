import { PostReferenceType, PostType } from "../../utils/constants";
import { DEFAULT_GUID } from "../../../../../utils/constants";

function getTitleAndMentions({ type, title, pollTitle, mentions }) {
  let titleWithMentions = PostType.isPollType(type) ? pollTitle : title;
  const mentionsFoundInTitle = [];
  mentions.forEach(({ key, value }) => {
    const regex = `@${value}`;
    if (!titleWithMentions.includes(regex)) return false;

    const regexExpression = new RegExp(regex, "g");
    titleWithMentions = titleWithMentions.replace(regexExpression, key);
    mentionsFoundInTitle.push(key);
  });
  console.log(parseMentionsIntoServerEntity(mentionsFoundInTitle));
  return {
    title: titleWithMentions,
    mentions: parseMentionsIntoServerEntity(mentionsFoundInTitle),
  };
}

function parseMentionsIntoServerEntity(mentions) {
  return mentions.map((key) => ({ memberId: key, memberType: 1 }));
}

function getTags({ tags }) {
  return tags.map(({ id = DEFAULT_GUID }) => ({ memberId: id, memberType: 1 }));
}

function getPollOptions({ type, poll: { options } }) {
  if (!PostType.isPollType(type)) return [];
  return options.map(({ value }) => ({
    id: DEFAULT_GUID,
    option: value,
    attachmentId: DEFAULT_GUID,
  }));
}

const SavePostRequestDto = (createPostDomainEntity) => {
  const { privacyType, type, attachments } = createPostDomainEntity;
  const { title, mentions } = getTitleAndMentions(createPostDomainEntity);
  const tags = getTags(createPostDomainEntity);
  const pollOptions = getPollOptions(createPostDomainEntity);

  return {
    id: DEFAULT_GUID,
    parentId: DEFAULT_GUID,
    referenceType: PostReferenceType.MAIN_FEED,
    referenceId: DEFAULT_GUID,
    privacyId: privacyType,
    type,
    title,
    mentions,
    tags,
    pollOptions,
    attachments,
  };
};

export default SavePostRequestDto;
