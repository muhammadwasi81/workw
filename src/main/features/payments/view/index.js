import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormContainer,
  FormHeader,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import PaymentTable from "./table";

const Index = () => {
  const { payment } = useSelector((state) => state.userBillingSlice);
  console.log(payment);

  useEffect(() => {
    //TODO: call api to get all payment
    console.log("mount payment component");
  }, []);

  return (
    <FormContainer>
      <FormHeader>{"Payment"}</FormHeader>
      <PaymentTable />
    </FormContainer>
  );
};

export default Index;
