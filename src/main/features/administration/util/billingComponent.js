import Billing from "../../billing/view/index";
import Payment from "../../payments/view/index";

const BillingComponent = () => {
  return (
    <div className="w-full">
      <Billing />
      <Payment />
    </div>
  );
};

export default BillingComponent;
