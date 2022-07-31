import React, { useContext } from "react";

import { listitem } from "../util/listitem";
import { Link, Item, List, AdminList as AList } from "../styles/employee.style.js";
import { useMediaQuery } from "react-responsive";
import { ROUTES } from "../../../../../../utils/routes";
import { Tooltip } from "antd";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../../utils/localization/languages";
import { useNavigate } from "react-router-dom";
const EmployeeList = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration, employee } = dictionaryList[userLanguage];
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const navigate = useNavigate()


	return (
		<List>
			<AList className="admin_list">
				{listitem.map(({ displayName, to, IconName,  }) => (
					<Item key={displayName}>
						<Tooltip
							title={isTabletOrMobile && displayName}
							placement="top"
							color="cyan"
						>
							<Link  onClick={() => { navigate(to) }} >
								{IconName}
								{!isTabletOrMobile &&
									employee[displayName]}
							</Link>
						</Tooltip>
					</Item>
				))}
			</AList>
		</List>
	);
};

export default EmployeeList;
