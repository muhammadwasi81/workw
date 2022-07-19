import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabbableContainer } from "../../../../layout/GridStyle";
import Header from "../../../../layout/header/index";
import { ContBody } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { getAllBusinessPolicy } from "../../store/action";
import ApprovalDetail from "./detailView";
import Listing from "./listView";
import './style.css'
export default function AllApprovals() {
    const dispatch = useDispatch();
    const { loader: loading, success, businessPolicies, policyDetail } = useSelector((state) => state.businessPolicySlice);
    useEffect(() => {
        dispatch(getAllBusinessPolicy())
    }, [])

    return (
        <TabbableContainer>
            <Header
                items={[{
                    name: "Business Policy",
                    to: "/businessPolicy"
                }]}
            />
            <ContBody>
                <div className="flex ApprovalMainView gap-4 w-full">
                    <div className="">
                        <Listing listData={businessPolicies} />
                    </div>
                    <div className="flex-1" >
                       {policyDetail && <ApprovalDetail item={policyDetail} />}
                    </div>
                </div>
            </ContBody>
        </TabbableContainer>
    )
}