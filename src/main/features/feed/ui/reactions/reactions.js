import { ReactionType } from "../../utils/constants";
import LikeIcon from "../../../../../content/NewContent/NewsFeed/svg/like.svg";
import appreciateIcon from "../../../../../content/NewContent/NewsFeed/svg/appreciateIcon.svg";
import celebrateIcon from "../../../../../content/NewContent/NewsFeed/svg/celebrateIcon.svg";
import LoveIcon from "../../../../../content/NewContent/NewsFeed/svg/heartIcon.svg";
import searchIcon from "../../../../../content/NewContent/NewsFeed/svg/searchIcon.svg";
export const reactions = {
	[ReactionType.Like]: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20px"
			height="30px"
			viewBox="0 0 32.4 28.276"
		>
			<g
				id="Layer_2"
				data-name="Layer 2"
				transform="translate(5.25 -0.197)"
			>
				<g
					id="Layer_1"
					data-name="Layer 1"
					transform="translate(0 -0.03)"
				>
					<g
						id="Group_7689"
						data-name="Group 7689"
						transform="translate(44.455 18.844)"
					>
						<g
							id="Path_820"
							data-name="Path 820"
							transform="translate(-2.504)"
							fill="currentColor"
						>
							<path
								d="M-29.052-18l-7.725,7.725a2.786,2.786,0,0,0-.809,1.966V5.62A2.8,2.8,0,0,0-34.8,8.408h12.55a2.809,2.809,0,0,0,2.566-1.687l4.545-10.611a4.19,4.19,0,0,0-2.216-5.494,4.19,4.19,0,0,0-1.632-.334h-7.881l1.324-6.388a2.105,2.105,0,0,0-.57-1.91A2.079,2.079,0,0,0-29.049-18Z"
								stroke="none"
							/>
							<path
								d="M -28.27151107788086 -15.24444198608398 L -35.00365447998047 -8.512298583984375 C -35.05620956420898 -8.45841121673584 -35.08507537841797 -8.387495040893555 -35.08499526977539 -8.309767723083496 L -35.08499526977539 5.614309310913086 C -35.08361053466797 5.775604248046875 -34.95217895507812 5.907039642333984 -34.79087066650391 5.908422470092773 L -22.25192832946777 5.908422470092773 C -22.13229370117188 5.907426834106445 -22.02398681640625 5.836456298828125 -21.97452354431152 5.726863861083984 L -17.43468856811523 -4.870956420898438 C -17.07300567626953 -5.727086067199707 -17.47408676147461 -6.718708992004395 -18.32858657836914 -7.082327842712402 C -18.53884506225586 -7.171627521514893 -18.7603759765625 -7.217067718505859 -18.98358535766602 -7.217377662658691 L -29.93591499328613 -7.217377662658691 L -28.27151107788086 -15.24444198608398 M -27.5732307434082 -18.61752700805664 C -27.04438018798828 -18.61750793457031 -26.51531600952148 -18.41701507568359 -26.11014556884766 -18.01528739929199 C -25.6114444732666 -17.51503753662109 -25.39749526977539 -16.7969970703125 -25.53987503051758 -16.10511779785156 L -26.86436462402344 -9.717377662658691 L -18.98358535766602 -9.717377662658691 C -18.42253494262695 -9.716608047485352 -17.86765670776367 -9.602707862854004 -17.35124588012695 -9.383367538452148 C -15.22251510620117 -8.477537155151367 -14.23048400878906 -6.017877578735352 -15.13554382324219 -3.889137744903564 L -19.68084335327148 6.721443176269531 C -20.12568473815918 7.742712020874023 -21.13309478759766 8.405342102050781 -22.2467155456543 8.408422470092773 L -34.79671478271484 8.408422470092773 C -36.33515548706055 8.403802871704102 -37.58038330078125 7.158573150634766 -37.58499526977539 5.620132446289062 L -37.58499526977539 -8.309767723083496 C -37.58576583862305 -9.04627799987793 -37.29485321044922 -9.752777099609375 -36.77614593505859 -10.27534770965576 L -29.04928398132324 -18.00297737121582 C -28.64292144775391 -18.41243362426758 -28.10818481445312 -18.61754417419434 -27.5732307434082 -18.61752700805664 Z"
								stroke="none"
								fill="currentColor"
							/>
						</g>
						<path
							id="Path_821"
							data-name="Path 821"
							d="M-45.667,11.49A2.8,2.8,0,0,0-42.878,8.7V-2.453a2.789,2.789,0,0,0-2.789-2.788,2.788,2.788,0,0,0-2.788,2.788V8.7A2.8,2.8,0,0,0-45.667,11.49Z"
							transform="translate(0 -3.082)"
							fill="currentColor"
							stroke="currentColor"
							stroke-width="2.5"
						/>
					</g>
				</g>
			</g>
		</svg>
	),
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
