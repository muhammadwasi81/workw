import { TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import BillingComponent from "../../../administration/util/billingComponent";
import Header from "../../view/Header/Header";

const BillingList = () => {
 
  return (
    <>
      <TabbableContainer>
        <Header />
        <BillingComponent isAllComany={true} />
      </TabbableContainer>
    </>
  );
};

export default BillingList;
