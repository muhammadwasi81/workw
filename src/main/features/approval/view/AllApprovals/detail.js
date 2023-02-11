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
import LeaveDetail from "../../../leave/view/DetailCard";
import ResignationDetail from "../../../resignation/view/detailCard";
import AppraisalDetail from "../../../appraisalModule/view/components/DetailedCard";
import ListItem from "../../../companies/view/Signup/ListItem";
import SignupDetail from "../../../companies/view/Signup/Detail";

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
    console.log(id, "ID")
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

        case ApprovalsModule.SignupApproval:
        return <SignupDetail id={id} />;

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

      case ApprovalsModule.LeaveApproval:
        return <LeaveDetail id={id} />;

      case ApprovalsModule.ResignationAdminApproval:
      case ApprovalsModule.ResignationExitApproval:
      case ApprovalsModule.ResignationFinanceApproval:
      case ApprovalsModule.ResignationHrApproval:
      case ApprovalsModule.ResignationItApproval:
      case ApprovalsModule.ResignationOtherApproval:
      case ApprovalsModule.ResignationReportingToApproval:
        return <ResignationDetail id={id} />;

      case ApprovalsModule.AppraisalApproval:
        return <AppraisalDetail id={id} />;

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
