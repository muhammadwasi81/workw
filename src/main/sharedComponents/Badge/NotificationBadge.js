import { memo } from "react";
import propTypes from "prop-types";

const NotificationBadge = ({
  notificationCount = 0,
  style = {},
  customClass = "",
}) => {
  return (
    <>
      {notificationCount > 0 && (
        <div
          className={`${`inline-block bg-red-500 rounded-full px-2 py-1 text-xs font-bold text-white`} ${customClass}`}
          style={{ ...style }}
        >
          {notificationCount}
        </div>
      )}
    </>
  );
};

NotificationBadge.propTypes = {
  notificationCount: propTypes.number,
  customClass: propTypes.string,
  style: propTypes.object,
};

export default memo(NotificationBadge);
