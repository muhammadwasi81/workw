import React, { useContext } from "react";

import { listitem } from "../util/listitem";
import { Link, Item, List, AdminList as AList } from "../styles/admin.style.js";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
const AdminList = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration } = dictionaryList[userLanguage];
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
	return (
		<List>
			<AList className="admin_list">
				{listitem.map(({ displayName, to, IconName }) => (
					<Item key={displayName}>
						<Tooltip
							title={isTabletOrMobile && displayName}
							placement="top"
							color="cyan"
						>
							<Link to={to}>
								{IconName}
								{!isTabletOrMobile &&
									administration[displayName]}
							</Link>
						</Tooltip>
					</Item>
				))}
			</AList>
		</List>
	);
};

export default AdminList;
