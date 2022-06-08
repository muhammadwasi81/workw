import { Modal } from "antd";
import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function NavComposer({ isVisible, onClose, children }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 800px)",
  });
  useEffect(() => {
    if (isDesktopOrLaptop) onClose();
  }, [isDesktopOrLaptop]);
  let classes = "notificationModal ";
  classes += Direction === "ltr" ? "" : "rtl";
  return (
    <div className="mainNotificationWrapper">
      <Modal
        wrapClassName={classes}
        visible={isVisible}
        getContainer=".main-app-style"
        onCancel={onClose}
        footer={null}
        width={400}
      >
        {children}
      </Modal>
    </div>
  );
}

export default NavComposer;
