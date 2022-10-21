import React, { useEffect } from "react";
import DetailView from "./DetailView";
import ListView from "./listView";
import { useDispatch, useSelector } from "react-redux";
import { getAllCareerAction } from "../../../careers/store/action";
import "./style.css";
import "../../../businessPolicy/view/businessPolicyMain/style.css";
import ApplyJob from "../../../careers/view/PublicRoute/ApplyJob";

function CareersListView() {
  const dispatch = useDispatch();

  //Todo call api for get all jobs
  useEffect(() => {
    let payload = {
      filterType: 0,
      search: "",
    };
    dispatch(getAllCareerAction(payload));
  }, []);

  return (
    <div className="_careersMainListView ">
      <ListView />
      <ApplyJob isShowCopyBtn={true} />
    </div>
  );
}

export default CareersListView;
