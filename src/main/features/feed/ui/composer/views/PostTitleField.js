import React from "react";
import { Form, Mentions } from "antd";
import { useSelector } from "react-redux";
import store from "../../../../../../store/store";
import { feedSlice } from "../../../store/slice";
import { PostType } from "../../../utils/constants";
import MentionUserItem from "../../../../../sharedComponents/ListItem/MentionUserItem/MentionUserItem";

const PostTitleField = () => {
	const { type, title, pollTitle } = useSelector(({ feedSlice }) => feedSlice.postCompose);
	const feedMentions = useSelector(({ feedSlice }) => feedSlice.mentionsOptions);
	console.log("abcd", feedMentions);
	return (
		<Form.Item name={"postDetail"}>
			<Form.Item>
				<Mentions
					rows={4}
					placeholder={PostType.getTitlePlaceHolder(type)}
					value={PostType.isPollType(type) ? pollTitle : title}
					onChange={value =>
						store.dispatch(
							feedSlice.actions.onPostTitleTextChange({ value })
						)
					}
					onSelect={e =>
						store.dispatch(
							feedSlice.actions.onPostMention({ ...e })
						)
					}
				>
					{feedMentions.map(({ id, avatar, text, designation }) => (
						<Mentions.Option key={id} value={text}>
							<MentionUserItem
								avatar={avatar}
								name={`${text}-${id}`}
								designation={designation}
							/>
						</Mentions.Option>
					))}
				</Mentions>
			</Form.Item>
		</Form.Item>
	);
};

export default PostTitleField;

// {feedMentions.map(({ id, avatar, text, designation }) => (
//     <Mentions.Option key={id} value={text}>
//         {text}
//         {/* <MentionUserItem avatar={avatar} name={`${text}-${id}`} designation={designation}/> */}
//     </Mentions.Option>
// ))}
