import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormContainer,
  FormHeader,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import BillingTable from "./table";
import { getAllBilling } from "../store/actions";

const Index = () => {
  const { billing } = useSelector((state) => state.userBillingSlice);
  console.log(billing);
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
      <FormContainer>
        <FormHeader>{"Billing"}</FormHeader>
        <BillingTable />
      </FormContainer>
    </>
  );
};

export default Index;
