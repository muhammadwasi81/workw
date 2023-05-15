import { useSelector } from "react-redux";
import Billing from "../../billing/view/index";
import Payment from "../../payments/view/index";

const BillingComponent = (props) => {
  const {isAdmin=false , isAtiveCompany=false , isAllComany=false} = props;
  const userSlice = useSelector((state) => state.userSlice);
  const businessId = userSlice?.user?.businessId
  
  return (
    <div className="w-full">
      <Billing isAdmin={isAdmin} businessId={businessId} isAtiveCompany={isAtiveCompany}  isAllComany={isAllComany} />
      <Payment />
    </div>
  );
};

export default BillingComponent;
