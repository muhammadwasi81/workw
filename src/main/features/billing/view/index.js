import {
  FormContainer,
  FormHeader,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import BillingTable from "./table";

const Index = () => {
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
