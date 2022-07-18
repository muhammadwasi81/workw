import React from "react";
import Tab from "../../../../sharedComponents/Tab";
import ApprovalItem from "../SideBarApproval/approvalItem";

const panes = [
    {
        title: `In Progress`,
        content: <div></div>,
        key: 0,
    },
    {
        title: `Accepted`,
        content: <div></div>,
        key: 1,
    },
    {
        title: `Declined`,
        content: <div></div>,
        key: 2,
    },
    {
        title: `Hold`,
        content: <div></div>,
        key: 3,
    },
];

export default function Listing() {

    return (
        <>
            <Tab panes={panes} />
            <div className="overflow-scroll h-[75vh]" >
                {
                    Array(100).fill({ type: 1, refrenceId:"9fb567fa-7a1e-4317-974b-ff59540ce4f9" }).map((item) => <ApprovalItem item={item} />)
                }
            </div>
        </>
    )
}