import React, { useContext } from "react";
import { Drawer } from "antd";
import { useSelector } from "react-redux";
// import { useMediaQuery } from "react-responsive";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import DetailCard from "./DetailCard";
// import { GetRewardById } from "../store/actions";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, rewardDictionary } = rewardDictionaryList[userLanguage];
  const { rewardDetail } = useSelector((state) => state.rewardSlice);
  // const dispatch = useDispatch();
  // useEffect(() => {
    // const isTablet = mediaQuery({ maxWidth: 800 });
    // props.id && dispatch(GetRewardById(props.id));
  // }, [props.id]);

  const isTablet = false;

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{rewardDictionary.reward}</h1>}
      width="768"
      height={"85%"}
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary">
      <DetailCard  id={props.id}/>
    </Drawer>
  );
}

export default DetailedView;
