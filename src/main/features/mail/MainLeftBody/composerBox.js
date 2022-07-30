import React, { useContext } from "react";
import { SyncOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ComposerBtnSection } from "../style/mail.style";
import { handleMailComposer } from "../Store/MailSlice";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import SharedButton from "../../../SharedComponent/button/";
import { getMailFolders, refreshMail } from "../Store/Api";
import { useLocation } from "react-router-dom";
import { createGuid } from "../../../../utils/base";

const ComposerBox = () => {
  const { responsiveSlice, mailSlice } = useSelector((state) => state);
  const { isMobileScreen } = responsiveSlice;
  const { isRefresh, mailComposerInstances } = mailSlice;
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { mail } = dictionaryList[userLanguage];
  const { pathname } = useLocation();
  const api_base = pathname.split("/")[2];

  const handleComposer = () => {
    const id = createGuid();
    const temArr = [...mailComposerInstances];

    const obj = {
      id,
      isMax: false,
      isMinimize: false,
    };
    temArr.push(obj);

    if ([...mailComposerInstances].length >= 3) {
      // [...mailComposerInstances].slice(1, 1, obj)
      // let newArr = [...mailComposerInstances];
      // newArr.splice(mailComposerInstances.length - 1, 1, obj);
      // dispatch(handleMailComposer(newArr));
    } else {
      dispatch(handleMailComposer(temArr));
    }
  };

  let objData = {
    folderPath: api_base,
    pageNo: 1,
    pageSize: 50,
    search: "",
  };

  const handleReFetchMail = () => {
    dispatch(refreshMail(objData));
    dispatch(getMailFolders());
  };

  return (
    <ComposerBtnSection isMobileScreen={isMobileScreen}>
      <SharedButton
        type="default"
        onClick={handleComposer}
        shape="square"
        size={isMobileScreen ? "middle" : "large"}
        title={mail.composer}
        antIcon={<PlusOutlined style={{ fontSize: 18 }} />}
        IconSize={isMobileScreen ? 12 : 12}
        toolTip={"reply"}
        style={{
          backgroundColor: "var(--primary_theme_color_green)",
          color: "#fff",
          borderRadius: "9px",
        }}
      />

      <SharedButton
        type="default"
        onClick={handleReFetchMail}
        shape="square"
        size={isMobileScreen ? "middle" : "large"}
        antIcon={
          <SyncOutlined style={{ color: "#0000009e" }} spin={isRefresh} />
        }
        style={{ backgroundColor: "#F4F4F4", borderRadius: "9px" }}
      />
    </ComposerBtnSection>
  );
};

export default ComposerBox;
