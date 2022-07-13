import { Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { groupByKey } from "../../../../../utils/base";
import { DOMAIN_PREFIX } from "../../../../../utils/routes";
import NavMenuList from "../../navbarMenuList";
import ReactDragListView from "react-drag-listview";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
function Menu() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const { pathname } = useLocation();
  let { navHrMenuData } = NavMenuList();
  const { navBarStatus } = useSelector((state) => state.responsiveSlice);
  const groupedMenuItems = groupByKey(navHrMenuData, "key");
  const [data, setData] = useState(groupedMenuItems);
  let currentCategory = "";

  useEffect(() => {
    setData(groupedMenuItems);
  }, [Direction]);

  const activeTab = (isActive, path) => {
    return isActive
      ? "on"
      : DOMAIN_PREFIX.length > 0
      ? pathname.split("/").includes(path.split("/")[2])
        ? "on"
        : ""
      : pathname.split("/").includes(path.split("/")[1])
      ? "on"
      : "";
  };

  const dragProps = {
    onDragEnd: (fromIndex, toIndex) => {
      const dataCopy = { ...data };
      const item = dataCopy[currentCategory].splice(fromIndex, 1)[0];
      dataCopy[currentCategory].splice(toIndex, 0, item);
      setData(dataCopy);
    },
    nodeSelector: "div",
    handleSelector: "a",
  };
  return (
    <div className="menu">
      {Object.keys(data).map((key) => {
        return (
          <>
            <span>{key}</span>
            <ReactDragListView {...dragProps}>
              {data[key].map(({ name, to: path, icon }, index) => {
                // eslint-disable-next-line no-lone-blocks
console.log(data)
                return !navBarStatus ? (
                  <Tooltip
                    title={name}
                    color={"#fff"}
                    placement="right"
                    key={index}
                    overlayClassName=""
                  >
                    <div
                      className="menu-item"
                      onDrag={() => {
                        currentCategory = key;
                      }}
                    >
                      <NavLink
                        className={({ isActive }) => {
                          return activeTab(isActive, path);
                        }}
                        to={path}
                      >
                        <div className="icon">
                          <img src={icon} alt="#" />
                        </div>
                        <p>{name}</p>
                      </NavLink>
                    </div>
                  </Tooltip>
                ) : (
                  <div
                    className="menu-item"
                    onDrag={() => {
                      currentCategory = key;
                    }}
                  >
                    <NavLink
                      className={({ isActive }) => {
                        return activeTab(isActive, path);
                      }}
                      to={path}
                    >
                      <div className="icon">
                        <img src={icon} alt="#" />
                      </div>
                      <p>{name}</p>
                    </NavLink>
                  </div>
                );
              })}
            </ReactDragListView>
          </>
        );
      })}
    </div>
  );
}

export default Menu;
