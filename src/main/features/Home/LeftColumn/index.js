import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getDesignation } from '../../Auth/store/authSlice';
import NewsFeed from "../NewsFeed/index";
import { getMailFolders } from "../../mail/Store/Api";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getDesignation());
    dispatch(getMailFolders());
  }, []);
  return (
    <div className="lf-col">
      <NewsFeed />
    </div>
  );
};

export default Index;
