import React, { useContext } from "react";

import { feedSlice } from "../../../store/slice";
import store from "../../../../../../store/store";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../../localization";
import TagSearchable from "../../../../../sharedComponents/UserSearchable/TagSearchable";

const PostTagField = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { composer } = FeedDictionary[userLanguage];
	const { WriteYourName, Write } = composer;

	return (
		<div className="select-users">
			<div className="badge">{Write}</div>
			<TagSearchable
				placeholder={WriteYourName}
				name={"tagUsers"}
				className="c-multi-select "
				onChange={e => {
					store.dispatch(feedSlice.actions.onPostTagsChange(e));
				}}
			/>
		</div>
	);
};

export default PostTagField;
