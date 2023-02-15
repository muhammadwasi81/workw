import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FormContainer,
  FormHeader,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import BillingTable from "./table";

const Index = () => {
  const { billing } = useSelector((state) => state.userBillingSlice);
  console.log(billing);

  useEffect(() => {
    //TODO: call api to get all payment
    console.log("mount Billing component");
  }, []);
  return (
    <>
      <FormContainer>
        <FormHeader>{"Billing"}</FormHeader>
        <BillingTable />
      </FormContainer>
    </>
  );
};

export default Index;
