import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormContainer,
  FormHeader,
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import { getAllPayment } from "../store/actions";
import PaymentTable from "./table";

const Index = () => {
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.userPaymentSlice);
  useEffect(() => {
    //TODO: change dynamic reference Id
    console.log("mount payment component");

    dispatch(
      getAllPayment({
        pageNo: 1,
        pageSize: 20,
        sortBy: 1,
        referenceId: "0AB5F9C0-F948-4C40-8DAD-C58BA99FB765",
      })
    );
  }, []);

  return (
    <FormContainer>
      <FormHeader>{"Payment"}</FormHeader>
      <PaymentTable data={payment} />
    </FormContainer>
  );
};

export default Index;
