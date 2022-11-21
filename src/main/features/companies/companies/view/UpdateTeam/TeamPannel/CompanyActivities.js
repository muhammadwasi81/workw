import React, { useContext } from "react";
import { listitem } from "../../../util/listitem";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";

import { useNavigate } from "react-router-dom";
import {
  Link,
  Item,
  List,
  AdminList as AList,
} from "../../../Styles/team.style.js";
import "../../../Styles/table.css";

import { LanguageChangeContext } from "../../../../../../../utils/localization/localContext/LocalContext";
import { companyDictionaryList } from "../../../localization/index";

function CompanyActivities({ id }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const labels = companyDictionary.companyActivities;

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const userId = id.split("/")[1];
  const baseURL = id.split("/")[0];

  return (
    <>
      <List>
        <AList className="admin_list">
          {listitem.map(({ displayName, to, IconName }) => {
            return (
              <Item key={displayName} active={to(userId).includes(baseURL)}>
                <Tooltip
                  title={isTabletOrMobile && displayName}
                  placement="top"
                  color="cyan"
                >
                  <Link
                    onClick={() => {
                      navigate(to(userId));
                    }}
                  >
                    {IconName}

                    {!isTabletOrMobile && labels[displayName]}
                  </Link>
                </Tooltip>
              </Item>
            );
          })}
        </AList>
      </List>
    </>
  );
}
export default CompanyActivities;
