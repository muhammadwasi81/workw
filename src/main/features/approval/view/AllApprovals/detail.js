import React from "react";
import Tab from "../../../../sharedComponents/Tab";
import Reward from "../../../reward/view/DetailCard";

const panes = [
    {
        title: `Deatils`,
        content: <div></div>,
        key: 0,
    }
];

export default function ApprovalDetail() {
    return (
        <div className="approvalDetail" >
            <Tab panes={panes} />
            <Reward id="9fb567fa-7a1e-4317-974b-ff59540ce4f9" />
        </ div>
    )
}