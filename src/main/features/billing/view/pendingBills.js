import { Collapse, Modal, Skeleton } from "antd";
import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
// import { getAllEmailConfigurations } from "../store/actions";
import { tableColumn ,pendingBillsColumns, BillingUserColumn } from "./tableColumn";
import { addBilling, getAllPendingBills } from "../store/actions";
const { Panel } = Collapse;


export default function PendingBills({}) {
  const dispatch = useDispatch();
  const {PendingBillData} = useSelector((state) => state.userBillingSlice);
  const [billingUserBoolean , setbillingUserBoolean] = useState(false)
  const [billingUsersData,setBillingUser] = useState();
  const [pendingBillDataState , setpendingBillDataState ] = useState(PendingBillData)

  useEffect(() => {
    dispatch(getAllPendingBills([]));
    setpendingBillDataState(PendingBillData)
  }, []);

  
  useEffect(() => {
    // dispatch(getAllPendingBills([]));
    setpendingBillDataState(PendingBillData)
  }, [PendingBillData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setbillingUserBoolean(!billingUserBoolean)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setbillingUserBoolean(!billingUserBoolean)
  };
  

  const handleClick = (billingUsers) => {
    
      
      setBillingUser(billingUsers)
      setbillingUserBoolean(!billingUserBoolean)
      showModal();
  }

  const addBilingHandler = (bilingData) => {
      console.log(bilingData,"billingData")
      dispatch(addBilling(bilingData))
      dispatch(getAllPendingBills([]));
      setpendingBillDataState(PendingBillData)
  }
  return (
    <>
    {
      pendingBillDataState?.map((bill , index)=>{
          return ( <Collapse defaultActiveKey={0} >
          <Panel
              header={bill?.business}
              key={0}
          >
          <AdminTable
            columns={pendingBillsColumns(handleClick , addBilingHandler)}
            dataSource={bill?.billings}
            pagination={false}
            rowKey="id"
            size="small"
            scroll={{ x: true }}
          />
          </Panel>
          </Collapse>)
      })
    }
   
    {billingUserBoolean && (
          <Modal title="Billig Users" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={null}> 
            {/* <FormHeader>{"Pending Bills"}</FormHeader> */}
            <AdminTable
      columns={BillingUserColumn()}
      dataSource={billingUsersData}
      pagination={false}
      rowKey="id"
      size="small"
      scroll={{ x: true }}
    />
          </Modal>
        )}
    </>   
  );
}
