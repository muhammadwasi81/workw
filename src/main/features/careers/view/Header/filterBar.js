import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { getAllCareerAction } from "../../store/action";
import { CareerFilterEnum } from "../../enum/index";

function Index() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");
  const [tableView, setTableView] = useState(false);

  useEffect(() => {
    console.log(filter, search);
    dispatch(getAllCareerAction(filter));
  }, [filter, search]);

  return (
    <>
      <TopBar
        onSearch={(value) => {
          setFilter({ ...filter, search: value });
        }}
        buttons={[
          {
            name: "Careers",
            to: "allDocuments",
            onClick: () => setFilter({ filterType: CareerFilterEnum.All }),
          },
          {
            name: "My Careers",
            to: "myDocuments",
            onClick: () =>
              setFilter({ filterType: CareerFilterEnum.MyCareers }),
          },
          {
            name: "For Approval",
            to: "forApprovals",
            onClick: () =>
              setFilter({ filterType: CareerFilterEnum.ForApproval }),
            // onClick: handleTabChange,
          },
        ]}
        // ]}
        // filter={{
        //   onFilter: () => {},
        // }}
        segment={{
          onSegment: (value) => {
            if (value === "Table") {
              setTableView(true);
            } else {
              setTableView(false);
            }
          },
          label1: "List",
          label2: "Table",
        }}
      />
    </>
  );
}

export default Index;
