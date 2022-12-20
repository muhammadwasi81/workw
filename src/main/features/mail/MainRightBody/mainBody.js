import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import Documents from "../../documents/view/documents";
import MailDetailView from "./mailDetailView";
import MailListing from "./mailListing";


const MainBody = () => {
  const dispatch = useDispatch();
  const mailHolder = useRef();


  return (
    <div className="mailMainBody" ref={mailHolder}>
      <Routes>
        <Route path={`${ROUTES.MAIL.LIST}/:id`} element={<MailListing />} />
        <Route path={`${ROUTES.MAIL.DETAIL}/:id`} element={<MailDetailView />} />
        <Route element={<BrokenPage />} />
      </Routes>
    </div>
  );
};

export default MainBody;
