import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormContainer,
  FormHeader,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import PaymentTable from "./table";

const Index = () => {
  return (
    <>
      <FormContainer>
        <FormHeader>{"Payment"}</FormHeader>
        <PaymentTable />
        {/* <EmailConfigurationTable
        handleEdit={setemailConfiguration}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      /> */}
      </FormContainer>
    </>
  );
};

export default Index;
