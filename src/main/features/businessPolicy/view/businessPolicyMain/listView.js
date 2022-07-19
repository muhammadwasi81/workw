import React from "react";
import { useDispatch } from "react-redux";
import { handleOpenDetail } from "../../store/slice";
import PolicyItem from "./policyItem";

export default function Listing({ listData }) {
    const dispatch = useDispatch();
    const handleClick = (item) => {
        dispatch(handleOpenDetail(item))
    }
    return (
        <>
            <div className="policyHeader colorTheme">
                Policies
            </div>
            <div className="overflow-scroll h-[85vh] w-[400px]" >
                {
                    listData.length !== 0 && listData?.map((item) =>
                        <PolicyItem item={item} handleClick={handleClick}/> )
                }
            </div>
        </>
    )
}