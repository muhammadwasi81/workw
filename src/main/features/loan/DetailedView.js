import React, { useContext, useEffect } from "react";
import { Drawer, Tag, Image, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { loanDictionaryList } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
//import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../sharedComponents/Tag/StatusTag";
import DefaultAttachment from "../../../content/NewContent/complain/DefaultAttachment.svg";
import RemarksApproval from "../../sharedComponents/AppComponents/Approvals/view";
import Avatar from "../../sharedComponents/Avatar/avatar";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../sharedComponents/Card/CardStyle";
import ListItem from "./ListItem";
import { useDispatch } from "react-redux";
import { GetLoanById } from "./store/actions";

function DetailedView(props) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, complainDictionary } = loanDictionaryList[userLanguage];

  const { loanDetail } = useSelector((state) => state.loanSlice);
  const {
    referenceNo,
    user,
    status,
    description,
    deductionPerMonth,
    amount,
    deadline,
    approvers,
  } = loanDetail || {};

  console.log(loanDetail);

  useEffect(() => {
    if (props.id) {
      dispatch(GetLoanById(props.id));
      console.log(props, "props in useEffect");
    }
  }, [props.id]);

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {/* {complainDictionary.complain} */}
          {"Loan"}
        </h1>
      }
      width="768"
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary"
      style={{
        cursor: "pointer",
      }}
    >
      {!Object.keys(loanDetail).length ? (
        <Skeleton avatar paragraph={{ rows: 6 }} />
      ) : (
        <ListItem item={loanDetail} />
      )}
    </Drawer>
  );
}

export default DetailedView;
