import { STRINGS } from "../../../../utils/base";
import { NOTIFICATION_ENUMS } from "./enums";

export const handleRedirect = (
  featureId = 2,
  referenceId = STRINGS.DEFAULTS.guid,
  navigate = () => {}
) => {
  let { FEATURE_ID } = NOTIFICATION_ENUMS;
  let requestedRoute;
  switch (featureId) {
    case FEATURE_ID.REWARD:
      // requestedRoute = `/rewardDetails/${referenceId}`;
      break;
    case FEATURE_ID.FEED:
      requestedRoute = `/newsFeedDetails/${referenceId}`;
      break;
    default:
      break;
  }
  navigate(requestedRoute);
};
