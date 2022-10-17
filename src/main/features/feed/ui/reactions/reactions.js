import { ReactionType } from "../../utils/constants";
import LikeIcon from "../../../../../content/NewContent/NewsFeed/svg/like.svg";
import appreciateIcon from "../../../../../content/NewContent/NewsFeed/svg/appreciateIcon.svg";
import celebrateIcon from "../../../../../content/NewContent/NewsFeed/svg/celebrateIcon.svg";
import LoveIcon from "../../../../../content/NewContent/NewsFeed/svg/heartIcon.svg";
import Liked from "../../../../../content/NewContent/NewsFeed/svg/Liked.svg";
import searchIcon from "../../../../../content/NewContent/NewsFeed/svg/searchIcon.svg";
export const reactions = {
	[ReactionType.Like]: Liked,
	[ReactionType.Love]: LoveIcon,
	[ReactionType.NoReaction]: LikeIcon,
	[ReactionType.Support]: appreciateIcon,
	[ReactionType.Celebrate]: celebrateIcon,
	[ReactionType.Curious]: searchIcon,
};

export const reactionDescription = {
	[ReactionType.Like]: "Like",
	[ReactionType.Love]: "Love",
	[ReactionType.NoReaction]: "Like",
	[ReactionType.Support]: "Appreciate",
	[ReactionType.Celebrate]: "Celebrate",
	[ReactionType.Curious]: "Curious",
};

export const reactionColor = {
	[ReactionType.Like]: "var(--currentThemeColor)",
	[ReactionType.Love]: "#ef5350",
	[ReactionType.NoReaction]: "",
	[ReactionType.Support]: "#5ea180",
	[ReactionType.Celebrate]: "#7986cb",
	[ReactionType.Curious]: "#fb8c00",
};
