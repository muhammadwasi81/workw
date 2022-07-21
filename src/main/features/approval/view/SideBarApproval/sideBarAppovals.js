import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import ApprovalItem from "./approvalItem";
import '../style.css'

export default function Approvals({onClose}) {
    return (
        <div className="approval_list_cont" >
            <div className="approval_header" >
                <div className="approval_header_child1">Approvals</div>
                <div className="approval_header_child2" >
                    <div>Refresh</div>
                    <NavLink to={ROUTES.APPROVALS.DEFAULT} > <div>See All</div> </NavLink>
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