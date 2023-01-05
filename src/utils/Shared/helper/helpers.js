import newsIcon from '../../../content/svg/menu/newNavBarIcon/News Feed.svg';
import messengerIcon from '../../../content/svg/menu/newNavBarIcon/Messenger.svg';
import groupsIcon from '../../../content/svg/menu/newNavBarIcon/Groups.svg';
import projectsIcon from '../../../content/svg/menu/newNavBarIcon/Projects.svg';
import taskIcon from '../../../content/svg/menu/newNavBarIcon/Tasks.svg';
import todoBoard from '../../../content/svg/menu/newNavBarIcon/Work Board.svg';
import contactManagerIcon from '../../../content/svg/menu/newNavBarIcon/Lead Manager.svg';
import schedulesIcon from '../../../content/svg/menu/newNavBarIcon/Schedules.svg';
import expensesIcon from '../../../content/svg/menu/newNavBarIcon/Expenses.svg';
import travelIcon from '../../../content/svg/menu/newNavBarIcon/Travel.svg';
import documentsIcon from '../../../content/svg/menu/newNavBarIcon/Docs-Archives.svg';
import eLearningIcon from '../../../content/svg/menu/newNavBarIcon/E Learning.svg';
import rewardIcon from '../../../content/svg/menu/rewardIcon.svg';
import teamIcon from '../../../content/svg/menu/newNavBarIcon/My Team.svg';
import customApprovalIcon from '../../../content/svg/menu/newNavBarIcon/Custom Approval.svg';
import employeeIcon from '../../../content/svg/menu/newNavBarIcon/Employees.svg';
import administrator from '../../../content/svg/menu/newNavBarIcon/Administration.svg';
import appraisalsIcon from '../../../content/svg/menu/newNavBarIcon/Appraisals.svg';
import departmentIcon from '../../../content/svg/menu/newNavBarIcon/Departments.svg';
import leavesIcon from '../../../content/svg/menu/newNavBarIcon/Leaves.svg';
import loanIcon from '../../../content/svg/menu/newNavBarIcon/Loan.svg';
import holiday_event from '../../../content/svg/menu/newNavBarIcon/Holidays.svg';
import career from '../../../content/svg/menu/newNavBarIcon/Career.svg';
import resignation from '../../../content/svg/menu/newNavBarIcon/resignation.svg';
import complainIcon from '../../../content/svg/menu/newNavBarIcon/complainIcon.svg';
import mailsIcon from '../../../content/svg/menu/newNavBarIcon/Mail Box.svg';
import assets from '../../../content/svg/menu/newNavBarIcon/assets.svg'; 
import payRollIcon from '../../../content/svg/menu/newNavBarIcon/Payroll.svg'; 
import promotionIcon from '../../../content/svg/menu/newNavBarIcon/promotionIcon.svg';
import bonusIcon from "../../../content/NewContent/bonus/bonus.svg";
import milepadIcon from "../../../content/NewContent/Documents/file/milepad.svg";
import milegrid from "../../../content/NewContent/Documents/file/milegrid.svg";
import mileboard from "../../../content/NewContent/Documents/file/mileboard.svg";
import orgChartIcon from "../../../content/svg/menu/newNavBarIcon/Org Chart.svg";
import defaultImage from "../../../content/business_default.png" ;

import videoIcon from "../../../content/NewContent/Messenger/videoIcon.svg";
import audio from "../../../content/audio.svg";

import { FeaturesEnum } from '../enums/enums';



export const getIconByFeaturesType = (FEATURES_TYPE) => {

    console.log(FEATURES_TYPE, "documentType")

    switch (FEATURES_TYPE) {
        case FeaturesEnum.FEATURES_TYPE.Feed:
            return newsIcon
        case FeaturesEnum.FEATURES_TYPE.Mailbox:
            return mailsIcon
        case FeaturesEnum.FEATURES_TYPE.Messenger:
            return messengerIcon
        case FeaturesEnum.FEATURES_TYPE.Group:
            return groupsIcon
        case FeaturesEnum.FEATURES_TYPE.Project:
            return projectsIcon
        case FeaturesEnum.FEATURES_TYPE.Task:
            return taskIcon 
        case FeaturesEnum.FEATURES_TYPE.WorkBoard:
            return todoBoard
        case FeaturesEnum.FEATURES_TYPE.Lead:
            return contactManagerIcon
        case FeaturesEnum.FEATURES_TYPE.Expense:
            return expensesIcon
        case FeaturesEnum.FEATURES_TYPE.Schedule:
            return schedulesIcon
        case FeaturesEnum.FEATURES_TYPE.Travel:
            return travelIcon
        case FeaturesEnum.FEATURES_TYPE.Document:
            return documentsIcon
        case FeaturesEnum.FEATURES_TYPE.ELearning:
            return eLearningIcon
        case FeaturesEnum.FEATURES_TYPE.Asset:
            return assets
        case FeaturesEnum.FEATURES_TYPE.CustomApproval:
            return customApprovalIcon
        case FeaturesEnum.FEATURES_TYPE.Employee:
            return employeeIcon
        case FeaturesEnum.FEATURES_TYPE.Administration:
            return administrator
        case FeaturesEnum.FEATURES_TYPE.Appraisal:
            return appraisalsIcon
        case FeaturesEnum.FEATURES_TYPE.Department:
            return departmentIcon
        case FeaturesEnum.FEATURES_TYPE.Leave:
            return leavesIcon
        case FeaturesEnum.FEATURES_TYPE.Loan:
            return loanIcon
        case FeaturesEnum.FEATURES_TYPE.Holiday:
            return holiday_event
        case FeaturesEnum.FEATURES_TYPE.Career:
            return career
        case FeaturesEnum.FEATURES_TYPE.AudioCalling:
            return audio
        case FeaturesEnum.FEATURES_TYPE.VideoCalling:
            return videoIcon
        case FeaturesEnum.FEATURES_TYPE.Attendance:
            return null
        case FeaturesEnum.FEATURES_TYPE.Grade:
            return null
        case FeaturesEnum.FEATURES_TYPE.Requisition:
            return resignation
        case FeaturesEnum.FEATURES_TYPE.MileBoard:
            return mileboard
        case FeaturesEnum.FEATURES_TYPE.MileGrid:
            return milegrid
        case FeaturesEnum.FEATURES_TYPE.MilePad:
            return milepadIcon
        case FeaturesEnum.FEATURES_TYPE.Payroll:
            return payRollIcon
        case FeaturesEnum.FEATURES_TYPE.Rewards:
            return rewardIcon
        case FeaturesEnum.FEATURES_TYPE.Complains:
            return complainIcon                    
        case FeaturesEnum.FEATURES_TYPE.Warnings:
            return career                  
        case FeaturesEnum.FEATURES_TYPE.Bonus:
            return bonusIcon        
        case FeaturesEnum.FEATURES_TYPE.Promotion:
            return promotionIcon                
        case FeaturesEnum.FEATURES_TYPE.OrganizationalChart:
            return orgChartIcon                 
        case FeaturesEnum.FEATURES_TYPE.MyTeam:
            return teamIcon
                                            
        default:
            return defaultImage
            break;
    }
}