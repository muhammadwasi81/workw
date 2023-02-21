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
      featureName: x.value,
      icon: getFeatureIcon(x.value),
      description: x.description,
      id: x.label,
      isChecked: checked.includes(x.value),
      isDisabled: disabled.includes(x.value),
    };
  });
};
function getFeatureIcon(feature) {
  if (feature === FeaturesEnum.Feed) return feedIcon;
}
