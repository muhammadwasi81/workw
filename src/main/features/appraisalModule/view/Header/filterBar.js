import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { handleChangeTab } from "../../store/slice";

function Index(props) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");

  const handleTabChange = (tab) => {
    dispatch(handleChangeTab(tab));
  };

  return (
    <>
      <TopBar
        onSearch={(value) => {
          props.onSearch(value);
        }}
        buttons={[
          {
            name: "Team Appraisals",
            to: "teamAppraisals",
            onClick: handleTabChange,
          },
          {
            name: "My Appraisals",
            to: "myAppraisals",
            onClick: handleTabChange,
          },
          {
            name: "For Approvals",
            to: "forApprovals",
            onClick: handleTabChange,
          },
        ]}
      />
    </>
  );
}

export default Index;
