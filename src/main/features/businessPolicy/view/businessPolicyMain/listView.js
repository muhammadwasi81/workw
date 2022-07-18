import React from "react";
import Tab from "../../../../sharedComponents/Tab";
import PolicyItem from "./policyItem";
// import Tab from "../../../../sharedComponents/Tab";
// import ApprovalItem from "../SideBarApproval/approvalItem";

const panes = [
    {
        title: `Policies`,
        content: <div></div>,
        key: 0,
    }
];

export default function Listing() {

    return (
        <>
            {/* <Tab panes={panes} /> */}
            <div className="policyHeader colorTheme">
                Policies
            </div>
            <div className="overflow-scroll h-[85vh] w-[400px]" >
                {
                    Array(100).fill({ type: 1, refrenceId: "9fb567fa-7a1e-4317-974b-ff59540ce4f9" }).map((item) =>
                        <PolicyItem item={item} />)
                }
            </div>
        </>
    )
}