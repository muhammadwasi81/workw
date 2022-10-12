import React, { useContext } from "react";
import MenuItem from "./MenuItem";
import { STRINGS } from "../../../../utils/base";
import ComposerBox from "./composerBox";
import { MailComposerBody } from "../style/mail.style";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { notification, Skeleton } from "antd";
import { MdInbox } from "react-icons/md";
import Demo from "./dataTree";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const { responsiveSlice, mailSlice } = useSelector((state) => state);
  const { mailFolderItem, responseCode, errorMessage } = mailSlice;
  const { isMobileScreen } = responsiveSlice;
  const {
    mail: { menuItem },
  } = dictionaryList[userLanguage];

  const openNotification = () => {
    notification.warning({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      placement: "bottomLeft",
      bottom: 10,
    });
  };

  return (
    <MailComposerBody isTablet={isTablet} isMobileScreen={isMobileScreen}>
      {/*** mail left body with mail compose button and folder item***/}

      <ComposerBox />
      <div className="mailMenuSection">
        {mailFolderItem?.map(({ folderPath, unseen }) => (
          <MenuItem
            key={folderPath}
            path={`${STRINGS.ROUTES.MAIL.DEFAULT}/${folderPath}`}
            pathName={folderPath}
            name={menuItem.inbox}
            badgeCount={unseen}
            icon={<MdInbox size={20} color={"var(--currentThemeColor)"} />}
            onChange={() => {}}
            style={{ margin: "6px 2px 1px 28px" }}
          />
        ))}

        <Demo mailFolderItem={mailFolderItem} />

        {responseCode !== 1002 &&
          !mailFolderItem &&
          [1, 2, 3, 4, 5, 6].map((value) => (
            <div style={{ marginBottom: 12 }} key={value}>
              <Skeleton.Button
                loading={true}
                active={!mailFolderItem && true}
                size={"small"}
                shape={"circle"}
                block={true}
                style={{ marginLeft: 10 }}
              />
              <Skeleton.Button
                style={{ marginLeft: 4, width: "160px" }}
                active={true}
                shape={"square"}
                size={"small"}
                block={true}
              />
            </div>
          ))}
      </div>

      {/*** mail left body with mail compose button and folder item***/}
    </MailComposerBody>
  );
};

export default Index;
