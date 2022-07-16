import React from "react";
import Tab from "../../../../sharedComponents/Tab";
import Reward from "../../../reward/view/DetailedView";

const panes = [
    {
        title: `Deatils`,
        content: <div></div>,
        key: 0,
    }
];

export default function ApprovalDetail() {
    return (
        <>
        <Tab panes={panes} />
        {/* <Reward /> */}
        </>
    )
}