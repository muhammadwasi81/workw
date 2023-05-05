import { Collapse, Modal, Popconfirm, Skeleton } from "antd";
import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
// import { getAllEmailConfigurations } from "../store/actions";
import { tableColumn ,pendingBillsColumns, BillingUserColumn } from "./tableColumn";
import { addBilling, getAllBilling, getAllPendingBills } from "../store/actions";
import { useLocation, useParams } from "react-router-dom";
const { Panel } = Collapse;


export default function PendingBills({}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const {id} = useParams();
  const {PendingBillData} = useSelector((state) => state.userBillingSlice);
  const [billingUserBoolean , setbillingUserBoolean] = useState(false)
  const [billingUsersData,setBillingUser] = useState();
  const [pendingBillDataState , setpendingBillDataState ] = useState(PendingBillData)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  
  useEffect(() => {
    setpendingBillDataState([...PendingBillData]);
    console.log(pendingBillDataState,"PendingBillData")
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

  const addBilingHandler =  async (bilingData) => {
    await dispatch(addBilling(bilingData))
    if(location.pathname.includes("companies/info/billing/"))
    {
        console.log("Called1")
        dispatch(getAllPendingBills([id]));
    }   
    else
    {
      console.log("Called2")
      dispatch(getAllPendingBills([]));
    }
    console.log(bilingData,"billingData")
    setpendingBillDataState([...PendingBillData]);

    dispatch(
      getAllBilling({
        pageNo: 1,
        pageSize: 20,
        search: "",
        sortBy: 1,
      })
    );
    }

  return (
    <>
    {pendingBillDataState &&
      pendingBillDataState?.map((bill , index)=>{
          return ( <Collapse defaultActiveKey={0} >
          <Panel
              header={bill?.business}
              key={0}
          >
          <AdminTable
            columns={pendingBillsColumns(handleClick , addBilingHandler ,isModalVisible ,selectedRecord , setIsModalVisible , setSelectedRecord )}
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
