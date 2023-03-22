import {ApprovalsModule} from "../enums/index";
import {FeaturesEnum} from "../../../../../../src/utils/Shared/enums/enums";

export const getFeaturesTypeByApprovalsType = (APPROVALS_TYPE) =>
 {
    console.log(FeaturesEnum, "documentType")

    switch (APPROVALS_TYPE) {
        case ApprovalsModule.ExpenseApproval:
            return FeaturesEnum.FEATURES_TYPE.Expense
        case ApprovalsModule.ExpenseExecutor:
            return FeaturesEnum.FEATURES_TYPE.Expense
        case ApprovalsModule.ExpenseFinance:
            return FeaturesEnum.FEATURES_TYPE.Expense
        case ApprovalsModule.LeaveApproval:
            return FeaturesEnum.FEATURES_TYPE.Leave
        case ApprovalsModule.TravelApproval:
            return FeaturesEnum.FEATURES_TYPE.Travel
        case ApprovalsModule.TravelAgent:
            return FeaturesEnum.FEATURES_TYPE.Travel
        case ApprovalsModule.WarningApproval:
            return FeaturesEnum.FEATURES_TYPE.Warnings  
        case ApprovalsModule.ComplainApproval:
            return FeaturesEnum.FEATURES_TYPE.Complains                              
        case ApprovalsModule.RewardApproval:
            return FeaturesEnum.FEATURES_TYPE.Rewards  
        case ApprovalsModule.BonusApproval:
            return FeaturesEnum.FEATURES_TYPE.Bonus  
        case ApprovalsModule.PromotionApproval:
            return FeaturesEnum.FEATURES_TYPE.Promotion  
        case ApprovalsModule.LoanApproval:
            return FeaturesEnum.FEATURES_TYPE.Loan  
        case ApprovalsModule.CustomApproval:
            return FeaturesEnum.FEATURES_TYPE.CustomApproval  
        case ApprovalsModule.DocumentApproval:
            return FeaturesEnum.FEATURES_TYPE.Document  
        case ApprovalsModule.PayrollApproval:
            return FeaturesEnum.FEATURES_TYPE.Payroll  
        case ApprovalsModule.CareerApproval:
            return FeaturesEnum.FEATURES_TYPE.Career  
        case ApprovalsModule.RequisitionApproval:
            return FeaturesEnum.FEATURES_TYPE.Requisition 
        case ApprovalsModule.RequisitionFinalApproval:
            return FeaturesEnum.FEATURES_TYPE.Requisition  
        case ApprovalsModule.AssetApproval:
            return FeaturesEnum.FEATURES_TYPE.Asset 
       
        default:
            //return defaultImage
            break;
    }
}