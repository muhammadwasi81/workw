import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import ChangePassword from "../view/ChangePassword";
import BasicInfo from "../view/BasicInfo";

function SettingRoutes() {
  return (
    <>
      <div className="updateFormsBody">
        <Routes>
          <Route path="changePassword/" element={<ChangePassword />} />
          <Route path="basicInfo/" element={<BasicInfo />} />
          <Route path="*" element={BrokenPage} />
        </Routes>
      </div>
      {/* <h1>Routes file</h1> */}
    </>
  );
}
export default SettingRoutes;
