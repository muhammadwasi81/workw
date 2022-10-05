import React from "react";
import DetailView from "./DetailView";
import ListView from "./listView";
import './style.css';
import '../../../businessPolicy/view/businessPolicyMain/style.css'

function CareersListView() {
  return (
    <div className="_careersMainListView ">
      <ListView />
      <DetailView />
    </div>
  );
}

export default CareersListView;