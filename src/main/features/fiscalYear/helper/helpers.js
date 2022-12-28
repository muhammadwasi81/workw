
import { fiscalYearEnum } from "../enum";

export const getMonthName = (MONTHS) =>
 {
    console.log(fiscalYearEnum, "fiscalYearEnum")

    switch (MONTHS) {
        case fiscalYearEnum.MONTHS.January:
            return "January"   
        case fiscalYearEnum.MONTHS.February:
            return "February"                           
        case fiscalYearEnum.MONTHS.March:
            return "March" 
        case fiscalYearEnum.MONTHS.April:
            return "April" 
        case fiscalYearEnum.MONTHS.May:
            return "May" 
        case fiscalYearEnum.MONTHS.June:
            return "June" 
        case fiscalYearEnum.MONTHS.July:
            return "July" 
        case fiscalYearEnum.MONTHS.August:
            return "August" 
        case fiscalYearEnum.MONTHS.September:
            return "September" 
        case fiscalYearEnum.MONTHS.October:
            return "October" 
        case fiscalYearEnum.MONTHS.November:
            return "November" 
        case fiscalYearEnum.MONTHS.December:
            return "December"             
    
        default:
            //return defaultImage
            break;
    }
}