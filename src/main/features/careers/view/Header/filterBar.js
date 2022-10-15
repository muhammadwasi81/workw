import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { getAllCareerAction } from "../../store/action";
import { handleChangeTab } from "../../store/slice";
import { CareerFilterEnum } from "../../enum/index";

function Index(props) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");
  // const [tableView, setTableView] = useState(false);

  const handleTabChange = (tab) => {
    dispatch(handleChangeTab(tab));
  };

  const onSegmentChange = (val) => {
    props.segment(val);
  };

  return (
    <>
      <TopBar
        onSearch={(value) => {
          setFilter({ ...filter, search: value });
        }}
        buttons={[
          {
            name: "Careers",
            to: "careers",
            onClick: handleTabChange,
          },
          {
            name: "My Careers",
            to: "myCareers",
            onClick: handleTabChange,
          },
          {
            name: "For Approval",
            to: "forApprovals",
            onClick: handleTabChange,
          },
        ]}
        // ]}
        // filter={{
        //   onFilter: () => {},
        // }}
        segment={{
          // onSegment: (value) => {
          //   if (value === "Table") {
          //     setTableView(true);
          //   } else {
          //     setTableView(false);
          //   }
          // },
          onSegment: (value) => onSegmentChange(value),
          label1: "List",
          label2: "Table",
        }}
      />
    </>
  );
}

export default Index;
