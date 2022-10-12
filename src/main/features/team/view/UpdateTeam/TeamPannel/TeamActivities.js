import React, { useContext } from "react";
import { listitem } from "../../../util/listitem";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../../utils/localization/languages";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Item,
  List,
  AdminList as AList,
} from "../../../Styles/team.style.js";
import Header from "../../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../../sharedComponents/AppComponents/MainFlexContainer";

function TeamActivities({ id }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { team } = dictionaryList[userLanguage];
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const userId = id.split("/")[1];
  const baseURL = id.split("/")[0];

  const items = [
    {
      name: "My Team",
      //   to: ROUTES.EMPLOYEES.EMPLOYEELINK,
      //    renderButton: buttonsEnum.employee,
    },
  ];

  return (
    <>
      {/* <TabbableContainer>
        <Header items={items} /> */}
      <List>
        <AList className="admin_list">
          {listitem.map(({ displayName, to, IconName }) => {
            console.log(displayName, "displayName");
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
                    {!isTabletOrMobile && displayName}
                    {/* {!isTabletOrMobile && team[displayName]} */}
                  </Link>
                </Tooltip>
              </Item>
            );
          })}
        </AList>
      </List>
      {/* </TabbableContainer> */}
    </>
  );
}
export default TeamActivities;
