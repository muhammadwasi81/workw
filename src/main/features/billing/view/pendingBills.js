import { Collapse, Modal, Popconfirm, Skeleton } from "antd";
import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
// import { getAllEmailConfigurations } from "../store/actions";
import { tableColumn ,pendingBillsColumns, BillingUserColumn } from "./tableColumn";
import { addBilling, getAllBilling, getAllPendingBills } from "../store/actions";
import { useLocation, useParams } from "react-router-dom";
const { Panel } = Collapse;


export default function PendingBills(props) {
  
  const {isAtiveCompany=false} = props;

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
    setpendingBillDataState(PendingBillData);
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

  const addBilingHandler =  (bilingData) => {
    
    const filteredBills = pendingBillDataState?.map((business) => {
      const filteredBillings = business?.billings?.filter((bill) => bill?.id !== bilingData?.id);
      return { ...business, billings: filteredBillings };
    });
    setpendingBillDataState(filteredBills);

    dispatch(addBilling(bilingData)).then(()=>{
      isAtiveCompany ?  dispatch(
        getAllBilling({
          pageNo: 1,
          pageSize: 20,
          search: "",
          sortBy: 1,
          businessIds:[id]
        })
      ) : dispatch(
        getAllBilling({
          pageNo: 1,
          pageSize: 20,
          search: "",
          sortBy: 1,
          businessIds:[]
        })
      )
    })
    // if(location.pathname.includes("companies/info/billing/"))
    // {
        
    // }   
    // else
    // {
    // ;
    // }
    }

  return (
    <>
    {pendingBillDataState &&
      pendingBillDataState?.map((bill , index)=>{
          return ( <Collapse defaultActiveKey={0} >
          <Panel
             header={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <b>{bill?.business}</b>
                <b>Total : ${bill?.billings?.reduce((acc, curr) => acc + curr.total, 0)}</b>
              </div>
            }
              key={1}
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
