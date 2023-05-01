import { Collapse, Skeleton } from "antd";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
// import { getAllEmailConfigurations } from "../store/actions";
import { tableColumn ,pendingBillsColumns } from "./tableColumn";
const { Panel } = Collapse;


export default function PendingBills({}) {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getAllEmailConfigurations());
  //   }, []);

  return (
    <Collapse defaultActiveKey={0} >
    
    <Panel
        header={"Pending Bills"}
        key={0}
    >
        <div
            dangerouslySetInnerHTML={{
                __html: "Pending Bills",
            }}
        >
        </div>
        <AdminTable
      columns={pendingBillsColumns()}
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
    </Panel>
    </Collapse>
    
  );
}
