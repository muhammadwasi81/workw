import { Skeleton } from "antd";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
// import { getAllEmailConfigurations } from "../store/actions";
import { tableColumn } from "./tableColumn";

export default function BillingTable({}) {
  const dispatch = useDispatch();
  const { billing } = useSelector((state) => state.userBillingSlice);  

  return (
    <AdminTable
      columns={tableColumn()}
      dataSource={billing}
      pagination={false}
      rowKey="id"
      size="small"
      scroll={{ x: true }}
    />
  );
}
