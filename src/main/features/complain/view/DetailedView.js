import React, { useContext } from "react";
import { Drawer } from "antd";
import { useMediaQuery } from "react-responsive";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ComplainDetail from "./ComplainDetail";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, complainDictionary } = complainDictionaryList[
    userLanguage
  ];

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const handleCancel = (e, payload) => {
    e.preventDefault();
    e.stopPropagation();
    // dispatch(cancelComplain(payload));
  };

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {complainDictionary.complain}
        </h1>
      }
      width="768"
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={props.visible}
      destroyOnClose={true}
      className="detailedViewComposer drawerSecondary"
    >
      <ComplainDetail id={props.id} handleCancel={handleCancel} />
    </Drawer>
  );
}

export default DetailedView;
