import React, { useState } from "react";
import { TabbableContainer } from "../../../../layout/GridStyle";
import Header from "../../../../layout/header/index";
import { ContBody } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import ApprovalDetail from "./detailView";
import Listing from "./listView";
import './style.css'
export default function AllApprovals() {
  const [tableView, setTableView] = useState(false);

  return (
    <TabbableContainer>
        <Header
        items={[{
            name:"Business Policy",
            to:"/businessPolicy"
        }]}
        />
        {/* <TopBar
          onSearch={(value) => {
            console.log(value);
          }}
        /> */}
        <ContBody>
        <div className="flex ApprovalMainView gap-4 w-full">
          <div className="">
            <Listing />
          </div>
          <div className="flex-1" >
            <ApprovalDetail />
          </div>
        </div>
        </ContBody>
    </TabbableContainer>
  )
}