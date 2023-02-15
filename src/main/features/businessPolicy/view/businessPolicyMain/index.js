import React, { useEffect, useState, useContext } from "react";
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
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { businessPolicyDictionaryList } from "../../localization";

export default function AllApprovals() {
  // const [filter, setFilter] = useState({
  //   search: "",
  // });
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { businessPolicyDictionary, Direction } = businessPolicyDictionaryList[
    userLanguage
  ];
  const {
    businessPolicy,
    policies,
    description,
    search,
  } = businessPolicyDictionary;
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
  };

  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: businessPolicy,
            to: "/businessPolicy",
          },
        ]}
      />

      <ContBody className="!block">
        <div className="flex ApprovalMainView gap-4 w-full">
          <div className="parent-div">
            <Listing
              listData={businessPolicies}
              onSearch={(value) => searchHandler(value)}
            />
          </div>
          <div className="flex-1 policyDetail">
            {policyDetail && <ApprovalDetail item={policyDetail} />}
          </div>
        </div>
      </ContBody>
    </TabbableContainer>
  );
}
