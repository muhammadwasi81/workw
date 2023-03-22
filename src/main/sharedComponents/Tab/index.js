import React, { useEffect } from "react";
import { Tabs } from "antd";
import "./tab.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
const { TabPane } = Tabs;
function Tab(props) {
  const {
    panes,
    canChangeRoute = false,
    onChangeTab,
    defaultPath,
    className,
    activeKey = "",
  } = props;

  // const [defaultPath, setDefaultPath] = useState("");
  // const onChange = key => {
  // 	if (canChangeRoute) {
  // 		navigate(key);
  // 	}
  // };
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { pathname } = location;

  // useEffect(() => {
  // 	if (canChangeRoute) {
  // 		setDefaultPath(pathname.split("_")[0]);
  // 	}
  // }, [pathname]);
  console.log("class", className);

  return (
    <>
      {canChangeRoute ? (
        <Tabs
          activeKey={canChangeRoute ? defaultPath : ""}
          onChange={onChangeTab}
          className={"custom_tab " + className}
          tabBarStyle={{
            background: "#ffffff",
            padding: "2px 5px",
            borderRadius: "10px",
            color: "var(--primary_theme_color_green)",
            fontWeight: "bold",
          }}
          dir={props.dir}
        >
          {panes?.map((pane) => {
            return (
              <TabPane tab={pane.featureName} key={pane.featureId}>
                {pane.content}
              </TabPane>
            );
          })}
        </Tabs>
      ) : (
        <Tabs
          defaultActiveKey={activeKey}
          className={"custom_tab " + className}
          tabBarStyle={{
            background: "#ffffff",
            padding: "2px 5px",
            borderRadius: "10px",
            color: "var(--primary_theme_color_green)",
            fontWeight: "bold",
          }}
          dir={props.dir}
        >
          {panes?.map((pane) => {
            return (
              <TabPane tab={pane.featureName} key={pane.featureId}>
                {pane.content}
              </TabPane>
            );
          })}
        </Tabs>
      )}
    </>
  );
}

export default Tab;
