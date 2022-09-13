import React from "react";
import Tab from "../../../../sharedComponents/Tab";
import Reward from "../../../reward/view/DetailCard";
import SalaryDetailCard from "../../../salary/view/SalaryList/salaryDetailCard";

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
            <SalaryDetailCard  id={"f1865fdd-f28f-4b75-9a14-234b62802bc0"}/>
        </ div>
    )
}