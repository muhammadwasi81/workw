import { React } from "react";
import TopBar from "../../../../sharedComponents/topBar/topBar";

function index() {
  return (
    <>
      <TopBar
        onSearch={(value) => {
          console.log(value);
        }}
        buttons={[
          {
            name: "Jobs",
            // onClick: () => setFilter({ filterType: 0 }),
          },
        ]}
        // filter={{
        //   onFilter: () => {},
        // }}
        // segment={{
        //   onSegment: (value) => {
        //     if (value === "Table") {
        //       setTableView(true);
        //     } else {
        //       setTableView(false);
        //     }
        //   },
        //   label1: "List",
        //   label2: "Table",
        // }}
      />
    </>
  );
}

export default index;
