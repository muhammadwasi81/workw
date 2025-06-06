import React, { useContext } from "react";
import {
  ContBody,
  TabbableContainer,
  HeaderMenuContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import HeaderNavLink from "../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import { ContainerHeader } from "../../sharedComponents/AppComponents/MainHeader";
import SettingUpdate from "./view/UpdateSetting/SettingPannel/index";
import Header from "../../layout/header";
import { ROUTES } from "../../../utils/routes";

import SettingList from "./view/UpdateSetting/SettingPannel/SettingList";

function Settings() {
  const items = [
    {
      name: "Settings",
      to: `${ROUTES.SETTINGS.SETTING}`,
    },
  ];

  return (
    <>
      <TabbableContainer>
        <Header items={items} />
        <ContBody>
          <SettingUpdate />
        </ContBody>
      </TabbableContainer>
    </>
  );
}
export default Settings;
