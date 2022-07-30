import React, { useContext } from "react";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { useDispatch } from "react-redux";
import { updateParamsId } from "../Store/MailSlice";
import { MdLabel, MdDelete, MdSend, MdDrafts, MdArchive } from "react-icons/md";
import { RiSpamFill } from "react-icons/ri";

const MenuItem = ({
  path,
  name,
  badgeCount,
  pathName,
  icon,
  onChange,
  style,
}) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const dispatch = useDispatch();
  const {
    Direction,
    mail: { menuItem },
  } = dictionaryList[userLanguage];

  const setDefaultIcon = (labelName) => {
    if (labelName === "Testing" || labelName === "Notes") {
      return <MdLabel size={20} color={"var(--primary_theme_color_green)"} />;
    } else if (labelName === "spam") {
      return (
        <RiSpamFill size={20} color={"var(--primary_theme_color_green)"} />
      );
    } else if (labelName === "Trash") {
      return <MdDelete size={20} color={"var(--primary_theme_color_green)"} />;
    } else if (labelName === "Sent") {
      return <MdSend size={20} color={"var(--primary_theme_color_green)"} />;
    } else if (labelName === "Drafts") {
      return <MdDrafts size={20} color={"var(--primary_theme_color_green)"} />;
    } else if (labelName === "Archive") {
      return <MdArchive size={20} color={"var(--primary_theme_color_green)"} />;
    } else
      return <MdLabel size={20} color={"var(--primary_theme_color_green)"} />;
  };

  const setDefaultLabel = (labelName) => {
    if (labelName === "spam") {
      return menuItem.spam;
    } else if (labelName === "Trash") {
      return menuItem.trash;
    } else if (labelName === "Sent") {
      return menuItem.sent;
    } else if (labelName === "Drafts") {
      return menuItem.draft;
    } else if (labelName === "Archive") {
      return menuItem.archive;
    } else return labelName;
  };

  return (
    <NavLink
      className={({ isActive }) => "mailMenuItem" + (isActive ? " on" : "")}
      to={path}
      onClick={() => {
        dispatch(updateParamsId(pathName));
        onChange(false);
      }}
      style={style}
    >
      {Direction === "ltr" ? (
        <>
          <div>
            {icon ? icon : setDefaultIcon(name)}
            <div
              style={{
                marginLeft: 10,
                color: "var(--primary_theme_color_green)",
                fontWeight: "900",
                width: "80px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {setDefaultLabel(name)}
            </div>
          </div>
          <Badge
            className="site-badge-count-109"
            count={badgeCount ? badgeCount : 0}
            style={{
              fontSize: 9,
              backgroundColor: "#F5222D",
              marginRight: 9,
            }}
          />
        </>
      ) : (
        <>
          <Badge
            className="site-badge-count-109"
            count={badgeCount ? badgeCount : 0}
            style={{ fontSize: 10, backgroundColor: "#F5222D" }}
          />
          <div>
            <div
              style={{
                marginRight: 5,
                color: "var(--primary_theme_color_green)",
                fontWeight: "900",
                width: "80px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textAlign: "end",
              }}
            >
              {setDefaultLabel(name)}
            </div>
            {icon ? icon : setDefaultIcon(name)}
          </div>
        </>
      )}
    </NavLink>
  );
};

export default MenuItem;
