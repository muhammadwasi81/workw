import React from "react";
import ApprovalItem from "./approvalItem";
import './style.css'

export default function Approvals() {
    return (
        <div className="approval_list_cont" >
            <div className="approval_header" >
                <div className="approval_header_child1">Approvals</div>
                <div className="approval_header_child2" >
                    <div>Refresh</div>
                    <div>See All</div>
                </div>
            </div>

            <div className="approval_list" >
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
                <ApprovalItem />
            </div>

        </div>
    )
}