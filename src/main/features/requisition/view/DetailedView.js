import React, { useContext } from "react";
import { Drawer } from "antd";
import { useSelector } from "react-redux";
import { requisitionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import DetailCard from "./DetailCard";
import { useMediaQuery } from "react-responsive";

// import { GetRewardById } from "../store/actions";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requisitionDictionary } = requisitionDictionaryList[
    userLanguage
  ];
  const { requisitionDetail } = useSelector((state) => state.requisitionSlice);
  // const dispatch = useDispatch();
  // useEffect(() => {
  // const isTablet = mediaQuery({ maxWidth: 800 });
  // props.id && dispatch(GetRewardById(props.id));
  // }, [props.id]);

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {requisitionDictionary.detail}
        </h1>
      }
      width="768"
      // height={"85%"}
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
    >
      <DetailCard id={props.id} />
    </Drawer>
  );
}

export default DetailedView;
