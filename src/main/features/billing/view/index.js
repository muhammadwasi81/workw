import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormContainer,
  FormHeader,
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import BillingTable from "./table";
import { getAllBilling, getAllPendingBills } from "../store/actions";
import { Button, Modal } from "antd";
import PendingBills from "./pendingBills";
import { useLocation, useParams } from "react-router-dom";
import userSlice from "../../../../store/appReducer/userSlice";

const Index = () => {
  const { billing } = useSelector((state) => state.userBillingSlice);
  const [PendingBillBoolean , setPendingBillBoolean] = useState(false)
  const {id} = useParams();
  const [atAdministration , setAtAdministration] = useState(true)
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setPendingBillBoolean(!PendingBillBoolean)
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPendingBillBoolean(!PendingBillBoolean)
    
  };
  
  const handleClick = () => {
    if(location.pathname.includes("companies/info/billing/"))
    {
        dispatch(getAllPendingBills([id]));
    }   
    else
    {
      dispatch(getAllPendingBills([]));
    }
    setPendingBillBoolean(!PendingBillBoolean)
    showModal();
  }

  // useEffect will  be modifed  - 
  useEffect(() => {

    // if else need to be modified -> business id will be passed from prop 
    location.pathname==="/administrator/billing" ? setAtAdministration(false) : setAtAdministration(true)
    if(location.pathname.includes("companies/info/billing/"))
    {
        dispatch(
          getAllBilling({
            pageNo: 1,
            pageSize: 20,
            search: "",
            sortBy: 1,
            businessIds:[id]
          })
        );
    }  
    else
    {
      dispatch(
      getAllBilling({
        pageNo: 1,
        pageSize: 20,
        search: "",
        sortBy: 1,
        businessIds:[]
      })
    );
    }
  }, []);
  return (
    <>
      {
        atAdministration && (
        <Button className="ThemeBtn" style={{marginTop:"4px" , marginBottom:"4px"}} onClick={handleClick}>
            Pending Bills
        </Button>
        )
      }
      <FormContainer>
        {PendingBillBoolean && (
          <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={null}>
            <FormHeader>{"Pending Bills"}</FormHeader>
            <PendingBills/>
          </Modal>
        )}
        <FormHeader>{"Billing"}</FormHeader>
        <BillingTable />
      </FormContainer>
    </>
  );
};

export default Index;
