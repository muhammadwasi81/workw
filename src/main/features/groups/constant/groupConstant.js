import feedIcon from "../../../../content/svg/menu/newNavBarIcon/News Feed.svg";
import schedulesIcon from "../../../../content/svg/menu/newNavBarIcon/Schedules.svg";
import todoBoard from "../../../../content/svg/menu/newNavBarIcon/Work Board.svg";
import taskIcon from "../../../../content/svg/menu/newNavBarIcon/Tasks.svg";
import travelIcon from "../../../../content/svg/menu/newNavBarIcon/Travel.svg";
import documentIcon from "../../../../content/NewContent/Documents/file/folder.svg";
import expensesIcon from "../../../../content/svg/menu/newNavBarIcon/Expenses.svg";
import QuotationIcon from "../../../../content/svg/menu/newNavBarIcon/Expenses.svg";
import {
  GroupFeatureEnums,
  groupFeatureEnums,
} from "../../../../utils/Shared/enums/groupFeatureEnum";

export const getFeatureDetails = ({
  allocatedFeatures = [],
  checked = [],
  disabled = [],
}) => {
  const featureDetails = groupFeatureEnums.filter((x) =>
    allocatedFeatures.includes(x.value)
  );
  return featureDetails.map((x) => {
    return {
      name: x.label,
      id: x.value,
      icon: getFeatureIcon(x.value),
      description: x.description,
      featureName: x.label,
      isChecked: checked.some((y) => y.featureId === x.value),
      isDisabled: disabled.some((y) => y.featureId === x.value),
    };
  });
};
function getFeatureIcon(feature) {
  if (feature === GroupFeatureEnums.Feed) return feedIcon;
  if (feature === GroupFeatureEnums.Task) return taskIcon;
  if (feature === GroupFeatureEnums.Schedule) return schedulesIcon;
  if (feature === GroupFeatureEnums.WorkBoard) return todoBoard;
  if (feature === GroupFeatureEnums.Travel) return travelIcon;
  if (feature === GroupFeatureEnums.Document) return documentIcon;
  if (feature === GroupFeatureEnums.Expense) return expensesIcon;
  if (feature === GroupFeatureEnums.Quotation) return QuotationIcon;
}
