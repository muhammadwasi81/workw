import React from "react";
import SettingRoutes from "../../../routes/SettingRoutes";
import {
  ContBody,
  TabbableContainer,
} from "../../../../../sharedComponents/AppComponents/MainFlexContainer";
import { SettingPanelContainer } from "../../../styles/setting.style";
import SettingList from "./SettingList";
import "../../../style/style.css";

function SettingUpdate() {
  return (
    <>
      <SettingPanelContainer>
        <SettingList />
        <SettingRoutes />
      </SettingPanelContainer>
    </>
  );
}
export default SettingUpdate;
