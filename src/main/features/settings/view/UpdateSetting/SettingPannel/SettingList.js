import React, { useContext } from "react";
import { listitem } from "../../../util/listItem";
import {
  Link,
  Item,
  List,
  SettingList as AList,
} from "../../../styles/setting.style.js";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";

function SettingList() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
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
                  {!isTabletOrMobile && displayName}
                </Link>
              </Tooltip>
            </Item>
          ))}
        </AList>
      </List>
    </>
  );
}
export default SettingList;
