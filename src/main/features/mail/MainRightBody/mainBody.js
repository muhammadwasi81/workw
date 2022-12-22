import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import { getMailFolders } from "../Store/Api";
import MailDetailView from "./mailDetailView";
import MailListing from "./mailListing";

const MainBody = () => {
  const mailHolder = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMailFolders());
  }, [dispatch]);

  return (
    <div className="mailMainBody" ref={mailHolder}>
      <Routes>
        <Route path={`:id`} element={<MailListing />} />
        <Route path={`:id/:detailId`} element={<MailDetailView />} />
        <Route element={<BrokenPage />} />
      </Routes>
    </div>
  );
};

export default MainBody;
