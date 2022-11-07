import React, { useContext } from "react";
import { Drawer } from "antd";
import { useSelector } from "react-redux";
// import { useMediaQuery } from "react-responsive";
import { resignationDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import DetailCard from "./detailCard";
// import { GetRewardById } from "../store/actions";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, resignationDictionary } = resignationDictionaryList[userLanguage];
  const { detail } = useSelector((state) => state.resignationSlice);
  // const dispatch = useDispatch();
  // useEffect(() => {
    // const isTablet = mediaQuery({ maxWidth: 800 });
    // props.id && dispatch(GetRewardById(props.id));
  // }, [props.id]);

  const isTablet = false;

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{"Resignation Detail"}</h1>}
      width="768"
      height={"85%"}
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={!!props.id}
      destroyOnClose={true}
      className="drawerSecondary">
      <DetailCard  id={props.id}/>
    </Drawer>
  );
}

export default DetailedView;
