import React from "react";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { ApprovalsModule } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import Tab from "../../../../sharedComponents/Tab";
import BonusDetailCard from "../../../bonus/view/DetailCard";
import ComplainDetail from "../../../complain/view/ComplainDetail";
import DocumentDetail from "../../../documents/view/components/detailCard";
import ExpenseDetail from "../../../expense/view/ExpenseDetail";
import LoanDetail from "../../../loan/LoanDetail";
import PayrolDetailCard from "../../../payroll/view/PayrollList/payrollDetailCard";
import PromotionDetail from "../../../promotion/view/PromotionDetail";
import RewardDetailCard from "../../../reward/view/DetailCard";
import SalaryDetailCard from "../../../salary/view/SalaryList/salaryDetailCard";
import TravelDetail from "../../../travel/view/TravelDetail/TravelDetail";
import WarningDetail from "../../../warning/view/DetailCard";
import AssetsDetail from "../../../assets/view/assetsDetailedCard";

export default function ApprovalDetail({ approvalDetailData }) {
  const panes = () => {
    return [
      {
        featureName: `Details`,
        content: <div></div>,
        featureId: 0,
      },
    ];
  };
  function getConditionalyModule({ module, referenceId: id }) {
    switch (module) {
      case ApprovalsModule.SalaryApproval:
        return <SalaryDetailCard id={id} />;

      case ApprovalsModule.TravelApproval:
      case ApprovalsModule.TravelAgent:
        return <TravelDetail travelId={id} />;

      case ApprovalsModule.DocumentApproval:
        return <DocumentDetail id={id} />;

      case ApprovalsModule.RewardApproval:
        return <RewardDetailCard id={id} />;

      case ApprovalsModule.BonusApproval:
        return <BonusDetailCard id={id} />;

      case ApprovalsModule.ComplainApproval:
        return <ComplainDetail id={id} />;

      case ApprovalsModule.PromotionApproval:
        return <PromotionDetail id={id} />;

      case ApprovalsModule.LoanApproval:
        return <LoanDetail id={id} />;

      case ApprovalsModule.PayrollApproval:
        return <PayrolDetailCard id={id} />;

      case ApprovalsModule.ExpenseApproval:
      case ApprovalsModule.ExpenseExecutor:
      case ApprovalsModule.ExpenseFinance:
        return <ExpenseDetail id={id} />;

      case ApprovalsModule.WarningApproval:
        return <WarningDetail id={id} />;

      case ApprovalsModule.AssetApproval:
        return <AssetsDetail id={id} />;

      default:
        return <></>;
    }
  }

  return (
    <div className="approvalDetail">
      <Tab panes={panes()} />
      {getConditionalyModule(approvalDetailData)}
    </div>
  );
}
