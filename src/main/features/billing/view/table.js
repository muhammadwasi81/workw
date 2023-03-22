import { Skeleton } from "antd";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
// import { getAllEmailConfigurations } from "../store/actions";
import { tableColumn } from "./tableColumn";

export default function BillingTable({}) {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getAllEmailConfigurations());
  //   }, []);

  return (
    <AdminTable
      columns={tableColumn()}
      dataSource={[]}
      pagination={false}
      rowKey="id"
      size="small"
      scroll={{ x: true }}
      //   locale={
      //     loadingData && {
      //       emptyText: (
      //         <Skeleton.Input
      //           active="true"
      //           size="small"
      //           block={true}
      //           //   loading={}
      //           round="true"
      //           shape="circle"
      //           style={{ width: "100%", marginBottom: 2 }}
      //         />
      //       ),
      //     }
      //   }
    />
  );
}
