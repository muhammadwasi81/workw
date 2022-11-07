import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabbableContainer } from "../../../../layout/GridStyle";
import Header from "../../../../layout/header/index";
import TopBar from "../../../../sharedComponents/topBar/topBar";

import { ContBody } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { getAllBusinessPolicy } from "../../store/action";
import ApprovalDetail from "./detailView";
import { Input } from "antd";
import Listing from "./listView";
import "./style.css";

export default function AllApprovals() {
  // const [filter, setFilter] = useState({
  //   search: "",
  // });
  const dispatch = useDispatch();
  const {
    loader: loading,
    success,
    businessPolicies,
    policyDetail,
  } = useSelector((state) => state.businessPolicySlice);

  useEffect(() => {
    dispatch(getAllBusinessPolicy());
  }, []);
  const searchHandler = (value) => {
    dispatch(getAllBusinessPolicy(value));
    console.log(value, "valueee");
  };
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: "Business Policy",
            to: "/businessPolicy",
          },
        ]}
      />

      <ContBody className="!block">
        {/* <div className="searchBar"> */}
        {/* <Input placeholder="Search" onCha /> */}
        {/* </div> */}
        <div className="flex ApprovalMainView gap-4 w-full">
          <div className="">
            <Listing
              listData={businessPolicies}
              onSearch={(value) => searchHandler(value)}
            />
          </div>
          <div className="flex-1">
            {policyDetail && <ApprovalDetail item={policyDetail} />}
          </div>
        </div>
      </ContBody>
    </TabbableContainer>
  );
}
