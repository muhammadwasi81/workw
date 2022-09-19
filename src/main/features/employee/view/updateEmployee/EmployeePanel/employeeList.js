import React, { useContext } from "react";

import { listitem } from "../util/listitem";
import {
  Link,
  Item,
  List,
  AdminList as AList,
} from "../styles/employee.style.js";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../../utils/localization/languages";
import { useNavigate } from "react-router-dom";
const EmployeeList = ({ id }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employee } = dictionaryList[userLanguage];
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const userId = id.split("/")[1];
  const baseURL = id.split("/")[0];
  return (
    <List>
      <AList className="admin_list">
        {listitem.map(({ displayName, to, IconName }) => {
          return (
            <Item key={displayName} active={to().includes(baseURL)}>
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
                  {!isTabletOrMobile && employee[displayName]}
                </Link>
              </Tooltip>
            </Item>
          );
        })}
      </AList>
    </List>
  );
};

export default EmployeeList;
