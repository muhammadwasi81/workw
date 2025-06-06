import {
  FeaturesEnum,
  FeaturesEnumList,
} from "../../../utils/Shared/enums/featuresEnums";
import feedIcon from "../../../content/svg/menu/newNavBarIcon/News Feed.svg";
import schedulesIcon from "../../../content/svg/menu/newNavBarIcon/Schedules.svg";
import todoBoard from "../../../content/svg/menu/newNavBarIcon/Work Board.svg";
import taskIcon from "../../../content/svg/menu/newNavBarIcon/Tasks.svg";
import travelIcon from "../../../content/svg/menu/newNavBarIcon/Travel.svg";
import documentIcon from "../../../content/NewContent/Documents/file/folder.svg";
import expensesIcon from "../../../content/svg/menu/newNavBarIcon/Expenses.svg";

export const getFeatureDetails = ({
  allocatedFeaures = [],
  checked = [],
  disabled = [],
}) => {
  const featureDetils = FeaturesEnumList.filter((x) =>
    allocatedFeaures.includes(x.value)
  );
  return featureDetils.map((x) => {
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
  if (feature === FeaturesEnum.Feed) return feedIcon;
  if (feature === FeaturesEnum.Task) return taskIcon;
  if (feature === FeaturesEnum.Schedule) return schedulesIcon;
  if (feature === FeaturesEnum.Workboard) return todoBoard;
  if (feature === FeaturesEnum.Travel) return travelIcon;
  if (feature === FeaturesEnum.Document) return documentIcon;
  if (feature === FeaturesEnum.Expense) return expensesIcon;
}
