import React, {useState } from "react";
import { TabbableContainer } from "../../../../layout/GridStyle";
import Header from "../../../../layout/header/index";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import Tab from "../../../../sharedComponents/Tab";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import ApprovalDetail from "./detail";
import Listing from "./listing";

export default function AllApprovals() {
    const [tableView, setTableView] = useState(false);

    return (
        <TabbableContainer>
            <Header
          buttons={[
            {
              buttonText: "Create Travel",
              // onClick: () => setVisible(true),
              render: (
                <SideDrawer title={"Hello"} buttonText={"Hello"} isAccessDrawer={false}>
                  "Hello"
                </SideDrawer>
              ),
            },
          ]}
        />
        <TopBar
          onSearch={(value) => {
            console.log(value);
          }}
          buttons={[
            {
              name: "Filter",
            }
          ]}
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
        <div className="flex ApprovalMainView gap-4">
          <div className="">  
            <Listing /> 
          </div>
          <div>
            <ApprovalDetail />
          </div>
        </div>
        </TabbableContainer>
    )
}