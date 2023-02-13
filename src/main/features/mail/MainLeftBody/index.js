import React, { useContext, useEffect } from "react";
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
import { ROUTES } from "../../../../utils/routes";
import { useDispatch } from "react-redux";
import { getAllMail } from "../Store/Api";
import { useLocation, useParams } from "react-router-dom";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const { responsiveSlice, mailSlice } = useSelector((state) => state);
  const { mailFolderItem, responseCode, errorMessage } = mailSlice;
  const { isMobileScreen } = responsiveSlice;
  const {
    mail: { menuItem },
  } = dictionaryList[userLanguage];

  // const { id: api_base } = useParams();
  const { pathname } = useLocation();
  const api_base = pathname.split("/");
  const lastIndex = api_base[api_base.length-1] 
  const dispatch = useDispatch()
  const GetAllMailHandle = () => {
    let objData = {
      folderPath: lastIndex,
    };
    dispatch(getAllMail(objData))
  };
  useEffect(() => {
    GetAllMailHandle();
  }, [lastIndex]);


  return (
    <MailComposerBody isTablet={isTablet} isMobileScreen={isMobileScreen}>
      {/*** mail left body with mail compose button and folder item***/}

      <ComposerBox
        handleReFetchMail={GetAllMailHandle} />
      <div className="mailMenuSection">
        {/* 
        {mailFolderItem?.map(({ folderPath, unseen }) => (
          <MenuItem
            key={folderPath}
            path={`${ROUTES.MAIL.ROOT}/${folderPath}`}
            pathName={folderPath}
            name={menuItem[folderPath]}
            badgeCount={unseen}
            icon={<MdInbox size={20} color={"var(--currentThemeColor)"} />}
            onChange={() => {}}
            style={{ margin: "6px 2px 1px 28px" }}
          />
        ))} */}
        {mailFolderItem &&
          <MenuItem
            path={`${ROUTES.MAIL.ROOT}/INBOX`}
            pathName={"INBOX"}
            name={menuItem["inbox"]}
            badgeCount={false}
            icon={<MdInbox size={20} color={"var(--currentThemeColor)"} />}
            onChange={() => { }}
            style={{ margin: "6px 2px 1px 28px" }}
          />}
        <Demo mailFolderItem={mailFolderItem} />

        {responseCode !== 1002 &&
          !mailFolderItem &&
          [1, 2, 3, 4, 5, 6].map((value) => (
            <div style={{ marginBottom: "15px", display: "flex" }} key={value}>
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
