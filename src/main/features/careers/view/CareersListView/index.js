import React from "react";
import DetailView from "./DetailView";
import ListView from "./listView";
import './style.css'

function CareersListView() {
  return (
    <div className="_careersListView">
      <ListView />
      <DetailView />
    </div>
  );
}

export default CareersListView;
