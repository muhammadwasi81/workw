import React, { useState } from "react";
import TopBar from "../../../../sharedComponents/topBar/topBar";

function LeadTopBar({ handleView, topBar, handleSearch }) {
  const [tableView, setTableView] = useState(true);
  handleView(tableView);
  return (
    <TopBar
      onSearch={(value) => {
        handleSearch(value);
      }}
      buttons={[]}
      segment={{
        onSegment: (value) => {
          if (value === topBar.table) {
            setTableView(true);
          } else {
            setTableView(false);
          }
        },
        label1: topBar.table,

        label2: topBar.list,
      }}
    />
  );
}

export default LeadTopBar;
