import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Tag, Avatar } from "antd";
import "antd/dist/antd.css";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { LinkOutlined } from "@ant-design/icons";
// import "./style.css";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import ApplyComposer from "../Composers/applyComposer";
import { GetRequisitionById } from "../../store/actions";

const RequisitionDetails = (props) => {
  // const { userLanguage } = useContext(LanguageChangeContext);
  // const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    //call career by id function
    dispatch(GetRequisitionById(id));
  }, []);

  console.log(id, "id");
  const Detail = useSelector((state) => {
    return state.requisitionSlice.Detail;
  });

  const {
    offer,
    budget,
    createDate,
    description,
    businessName,
    businessAddress,
    creator,
    endDate,
    name,
    deadline,
  } = Detail;

  console.log(Detail, "Requisition detail in apply Requisition");

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleDrawerOpen = () => {
    setVisible(true);
  };

  //   let notesTime = !moment(new Date()).fromNow(createDate)
  //     ? moment(createDate).format("LT")
  //     : moment(createDate).format("MMM Do YYYY");
  return (
    <>
      {/* <ApplyComposer visible={visible} onClose={handleDrawerClose} id={id} /> */}
      <div className="item careersQuickDetail">
        <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
          <div>
            <Avatar size={45} src={creator?.image} />
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-bold text-sky-900">
              {name ? name : "-"}
            </div>

            <div className="text-xs">{creator?.email}</div>
            <div className="text-xs">
              {/* {creator.email ? creator.email : "" } */}
            </div>
          </div>
          <div className="linkDiv">
            <Tag className="LinkTag ThemeBtn" onClick={handleDrawerOpen}>
              {"Apply Now"}
            </Tag>
            {/* <Tag className="LinkTag ThemeBtn">
              <LinkOutlined /> {"Copy Link"}
            </Tag> */}
          </div>
        </div>

        <div className="mt-5">
          <div className="font-bold"> Description</div>
          <div>{description}</div>
        </div>

        {/* <div className="mt-5">
          <div className="font-bold">Skills Required</div>
          <div>
            {skills
              ? skillsArray?.map((item, index) => {
                return <Tag className="LinkTag">{item}</Tag>;
              })
              : null}
          </div>
        </div> */}

        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">Budget</div>
            <div className="cardSection__body">
              {budget ? budget : "" }
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Business Name</div>
            <div className="cardSection__body">
              {businessName ? businessName : ""}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Create Date</div>
            <div className="cardSection__body">
              {" "}
              {createDate ? moment(createDate).format("Do MMM YY") : "-"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Deadline</div>
            <div className="cardSection__body">
              {" "}
              {deadline ? moment(deadline).format("Do MMM YY") : "-"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RequisitionDetails;
