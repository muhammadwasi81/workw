import {ApprovalsModule} from "../enums/index";
import {FeaturesEnum} from "../../../../../../src/utils/Shared/enums/enums";

export const getApprovalsTypeByFeaturesType = (APPROVALS_TYPE) =>
 {
    console.log(FeaturesEnum, "documentType")

    switch (APPROVALS_TYPE) {
        case ApprovalsModule.APPROVALS_TYPE.ExpenseApproval:
            return FeaturesEnum.FEATURES_TYPE.Expense
        case ApprovalsModule.APPROVALS_TYPE.ExpenseExecutor:
            return FeaturesEnum.FEATURES_TYPE.Expense
        case ApprovalsModule.APPROVALS_TYPE.ExpenseFinance:
            return FeaturesEnum.FEATURES_TYPE.Expense
        case ApprovalsModule.APPROVALS_TYPE.LeaveApproval:
            return FeaturesEnum.FEATURES_TYPE.Leave
        case ApprovalsModule.APPROVALS_TYPE.TravelApproval:
            return FeaturesEnum.FEATURES_TYPE.Travel
        case ApprovalsModule.APPROVALS_TYPE.TravelAgent:
            return FeaturesEnum.FEATURES_TYPE.Travel
        case ApprovalsModule.APPROVALS_TYPE.WarningApproval:
            return FeaturesEnum.FEATURES_TYPE.Warnings  
        case ApprovalsModule.APPROVALS_TYPE.ComplainApproval:
            return FeaturesEnum.FEATURES_TYPE.Complains                              
        case ApprovalsModule.APPROVALS_TYPE.RewardApproval:
            return FeaturesEnum.FEATURES_TYPE.Rewards  
        case ApprovalsModule.APPROVALS_TYPE.BonusApproval:
            return FeaturesEnum.FEATURES_TYPE.Bonus  
        case ApprovalsModule.APPROVALS_TYPE.PromotionApproval:
            return FeaturesEnum.FEATURES_TYPE.Promotion  
        case ApprovalsModule.APPROVALS_TYPE.LoanApproval:
            return FeaturesEnum.FEATURES_TYPE.Loan  
        case ApprovalsModule.APPROVALS_TYPE.CustomApproval:
            return FeaturesEnum.FEATURES_TYPE.CustomApproval  
        case ApprovalsModule.APPROVALS_TYPE.DocumentApproval:
            return FeaturesEnum.FEATURES_TYPE.Document  
        case ApprovalsModule.APPROVALS_TYPE.PayrollApproval:
            return FeaturesEnum.FEATURES_TYPE.Payroll  
        case ApprovalsModule.APPROVALS_TYPE.CareerApproval:
            return FeaturesEnum.FEATURES_TYPE.Career  
        case ApprovalsModule.APPROVALS_TYPE.RequisitionApproval:
            return FeaturesEnum.FEATURES_TYPE.Requisition 
        case ApprovalsModule.APPROVALS_TYPE.RequisitionFinalApproval:
            return FeaturesEnum.FEATURES_TYPE.Requisition  
        case ApprovalsModule.APPROVALS_TYPE.AssetApproval:
            return FeaturesEnum.FEATURES_TYPE.Asset 
       
        default:
            //return defaultImage
            break;
    }
}