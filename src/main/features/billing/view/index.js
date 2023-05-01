import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormContainer,
  FormHeader,
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import BillingTable from "./table";
import { getAllBilling } from "../store/actions";
import { Button, Modal } from "antd";
import PendingBills from "./pendingBills";

const Index = () => {
  const { billing } = useSelector((state) => state.userBillingSlice);
  console.log(billing);
  const [PendingBillBoolean , setPendingBillBoolean] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllBilling({
        pageNo: 1,
        pageSize: 20,
        search: "",
        sortBy: 1,
        referenceId: "0AB5F9C0-F948-4C40-8DAD-C58BA99FB765",
      })
    );
    //TODO: call api to get all billing
    console.log("mount Billing component");
  }, []);
  return (
    <>
      <Button className="ThemeBtn" style={{float:"right",  marginRight:"78px" , marginTop:"2px"}} onClick={()=>{ setPendingBillBoolean(!PendingBillBoolean)}}>
        Pending Bills
      </Button>
      <FormContainer>
        {PendingBillBoolean && (
          <>
          <FormHeader>{"Pending Bills"}</FormHeader>
          <PendingBills/>
          </>
        )}
        <FormHeader>{"Billing"}</FormHeader>
        <BillingTable />
      </FormContainer>
    </>
  );
};

export default Index;
