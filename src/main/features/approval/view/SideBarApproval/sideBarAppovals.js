import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import ApprovalItem from "./approvalItem";
import '../style.css'
import { useDispatch } from "react-redux";
import { getAllApproval } from "../../store/action";
import { useSelector } from "react-redux";
import { setApprovalStatus } from "../../../../../store/appReducer/responsiveSlice";

const defaultFilter = {
    pageNo: 0,
    search: "",
    status: [1]
}

export default function Approvals() {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(defaultFilter);
    const [approvalStatus, setApprovalStatus] = useState(true)
    // const approvalStatus = useSelector(state => state.responsiveSlice.approvalStatus);
    const approvalList = useSelector(state => state.approvalSlice.approvalList);
    useEffect(() => {
        let isMyApproval = true;
        if (approvalStatus)
            dispatch(getAllApproval({isMyApproval, filter}));
    }, [approvalStatus]);

    console.log(filter, "FROM SIDEBAR")
    return (
        <div className="approval_list_cont" >
            <div className="approval_header" >
                <div className="approval_header_child1">Approvals</div>
                <div className="approval_header_child2" >
                    <div>Refresh</div>
                    <NavLink to={ROUTES.APPROVALS.DEFAULT} >
                        <div onClick={() => dispatch(setApprovalStatus(false))} >
                            See All
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="approval_list" >
                {
                    approvalList && approvalList.length > 0 ? approvalList.map((item) =>
                        <ApprovalItem item={item} />
                    ) : <p className="noData">No data...</p>
                }
            </div>

        </div>
    )
}