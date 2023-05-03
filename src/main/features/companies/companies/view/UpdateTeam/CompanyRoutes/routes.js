import React from "react";
import { Route, Routes } from "react-router-dom";
// import { BrokenPage } from "../../../../../../utils/base";\
import "../../../Styles/company.css";
import BaiscInfo from "../../BasicInfo";
import DashBoard from "../../DashBoard";
import SendEmail from "../../SendEmail";
import BillingComponent from "../../../../../administration/util/billingComponent";

const CompanyRoutes = () => {
  return (
    <>
      <div className="updateFormsBody w-full">
        <Routes>
          <Route path={"basicInfo/:id"} element={<BaiscInfo />} />
          <Route path={"leaves/:id"} element={<SendEmail />} />
          <Route path={"dashboard/:id"} element={<DashBoard />} />
          <Route path={"billing/:id"} element={<BillingComponent  />} />
        </Routes>
      </div>
    </>
  );
};
export default CompanyRoutes;
