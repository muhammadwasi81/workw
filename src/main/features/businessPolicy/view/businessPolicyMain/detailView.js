import React from "react";
import PolicyItem from "./policyItem";

export default function ApprovalDetail({ item }) {
    return (
        <div className="approvalDetail" >
            <div className="policyHeader colorTheme">
                Description
            </div>
            {/* <PolicyItem item={item} /> */}
            <div className="item-card" >
                <div className="!flex !flex-row" >
                    <div className="row flex-1 !w-max !mb-0 font-bold" >
                        {item.name}
                    </div>
                    <div className="w-max mr-2" >
                        <div className="policyTag" >
                            {item.typeId === 1 ? "HR" : item.typeId === 2 ? "Other" : ""}
                        </div>
                    </div>
                </div>
                <div className="row !mb-0 mt-4" >
                    {item.description}
                </div>
            </div>
        </ div>
    )
}