import { useContext, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { groupByKey } from "../../../../../utils/base";
import { DOMAIN_PREFIX } from "../../../../../utils/routes";
import NavMenuList from "../../navbarMenuList";
import ReactDragListView from "react-drag-listview";
import { Collapse } from "antd";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import {
  CaretRightOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
  FeaturePermissionEnumList,
  FeaturesEnumList,
} from "../../../../../utils/Shared/enums/featuresEnums";
import NotificationBadge from "../../../Badge/NotificationBadge";
import { useDispatch } from "react-redux";
import { getAllNotification } from "../../../../../utils/Shared/store/actions";
const { Panel } = Collapse;

export default function Menu() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, navMenuLabel } = dictionaryList[userLanguage];
  const { notificationCounts } = useSelector((state) => state.sharedSlice);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  let { menuItems } = NavMenuList(notificationCounts);

  useEffect(() => {
    dispatch(getAllNotification());
  }, []);

  // console.log("menuItems", menuItems);
  const { navBarStatus } = useSelector((state) => state.responsiveSlice);
  const { user } = useSelector((state) => state.userSlice);

  const groupedMenuItems = groupByKey(
    [...menuItems.filter((x) => getUserPermissions().includes(x.featureId))],
    "key"
  );
  const [data, setData] = useState(groupedMenuItems);
  let currentCategory = "";

  function getUserPermissions() {
    return FeaturePermissionEnumList.map((x) => {
      if (user?.permissions.includes(x?.id)) {
        return x.featureId;
      }
    });
  }

  useEffect(() => {
    setData(groupedMenuItems);
  }, [Direction, notificationCounts, navMenuLabel]);

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

  const renderIcons = {
    Menu: (
      <MenuUnfoldOutlined
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    ),
    HR: (
      <UsergroupAddOutlined
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    ),
    Finance: (
      <FileDoneOutlined
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    ),
    "Workwise Companies": (
      <GlobalOutlined
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    ),
    Inventory: (
      <SafetyCertificateOutlined
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    ),
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
      {Object.keys(data).map((key, ObjIndex) => {
        return (
          <>
            <Collapse
              expandIconPosition="end"
              className="MenuCollapse"
              defaultActiveKey={["1", "2", "3", "4", "5"]}
              onChange={() => {}}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel header={key} key="1" extra={renderIcons[key]}>
                <ReactDragListView {...dragProps}>
                  {data[key].map(
                    ({ name, to: path, icon, notificationCount }, index) => {
                      return !navBarStatus ? (
                        <Tooltip
                          title={name}
                          color={""}
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
                              end
                            >
                              <div className="icon">
                                <img src={icon} alt="#" />
                              </div>
                              <p>{name}</p>
                              <p>{notificationCount}</p>
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
                            end
                          >
                            <div className="icon">
                              <img src={icon} alt="#" />
                            </div>
                            <p>{name}</p>
                            <NotificationBadge
                              notificationCount={notificationCount}
                            />
                          </NavLink>
                        </div>
                      );
                    }
                  )}
                </ReactDragListView>
              </Panel>
            </Collapse>
          </>
        );
      })}
    </div>
  );
}
