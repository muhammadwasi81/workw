import React from "react";
import Remarks from "./Remarks";
import noData from "../../../../../content/svg/noData.svg";
import { P } from "@antv/g2plot";
function ApprovalBody({ remarks }) {
  return (
    <div className="approval__header-body">
      {remarks.length > 0 ? (
        remarks.map(({ id, remarker, status, type, remark, createDate }) => {
          return (
            <Remarks
              key={id}
              remarker={remarker}
              status={status}
              type={type}
              remark={remark}
              date={createDate}
            />
          );
        })
      ) : (
        <div className="remarkNoData">
          <img src={noData} alt="" />
          <p>No Data</p>
        </div>
      )}
    </div>
  );
}

export default ApprovalBody;
