import React from "react";
import { Drawer } from "antd";
import DetailCard from "./DetailedCard";

function DetailedView(props) {
  //   const { detail } = useSelector((state) => state.resignationSlice);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const isTablet = mediaQuery({ maxWidth: 800 });
  // props.id && dispatch(GetRewardById(props.id));
  // }, [props.id]);

  const isTablet = false;

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>{"Appraisal Detail"}</h1>
      }
      width="768"
      height={"85%"}
      placement={
        ("rtl" === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={!!props.id}
      destroyOnClose={true}
      className="drawerSecondary"
    >
      {/* <DetailCard id={props.id} /> */}
      <DetailCard id={props.id} />
    </Drawer>
  );
}

export default DetailedView;
