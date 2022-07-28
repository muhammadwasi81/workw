import { PollType, PostReferenceType, PostType } from "../../utils/constants";
import { DEFAULT_GUID } from "../../../../../utils/constants";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { getMentionsAndText } from "../../../../../utils/base";

function getTitleAndMentions({ type, title, pollTitle, mentions }) {
  let titleWithMentions = PostType.isPollType(type) ? pollTitle : title;
  return getMentionsAndText(titleWithMentions, mentions);
}

function getTags({ tags }) {
  return tags.map(({ id = DEFAULT_GUID }) => ({ memberId: id, memberType: 1 }));
}

function getPollOptions({ type, poll: { options } }) {
  if (!PostType.isPollType(type)) return [];
  return options.map(({ value, attachment }) => ({
    id: DEFAULT_GUID,
    option: value,
    attachment: { id: defaultUiid, file: attachment },
    type: PollType.DEFAULT,
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
