import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, Route, Routes, useParams } from "react-router-dom";
import { Checkbox, Rate, Skeleton } from "antd";
import {
  parseDate,
  parseDateWithMontAndYear,
  STRINGS,
} from "../../../../utils/base";
import { useMediaQuery } from "react-responsive";
import mailAttachmentIcon from "../assests/mailAttachmentIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeMailSeenFlag, getAllMail, getMailFolders } from "../Store/Api";
import MailItem from "./mailItem";
import AntTooltip from "../../../sharedComponents/Tooltip/AntTooltip";
import { ROUTES } from "../../../../utils/routes";
import MailDetailView from "./mailDetail";

const MailListing = () => {
  const dispatch = useDispatch();

  let {
    allMail,
    currentParamId,
    inProcess,
    currentPageSize,
    mailDetail,
  } = useSelector((state) => state?.mailSlice);

  const isTablet = useMediaQuery({ maxWidth: 599 });

  // const { pathname } = useLocation();
  // const api_base = pathname.split("/")[2];
  const { id: api_base } = useParams();
  const mailHolder = useRef();
  const [selectedMail, setSelectedMail] = useState(undefined);


  const GetAllMailHandle = () => {
    let objData = {
      folderPath: api_base,
      pageNo: currentPageSize,
      pageSize: 25,
      search: "",
    };
    handlePagination(false);
    if (mailDetail === null) dispatch(getAllMail(objData));

    if (!inProcess) {
      handlePagination(true);
    }
  };

  const handleClick = (id) => {
    setSelectedMail(id)
  }

  const changeSeenFlag = (ID, IsRead) => {
    dispatch(
      changeMailSeenFlag({ uid: ID, flag: IsRead, folderPath: api_base })
    );
  };
  const handlePagination = (doPagination = true) => { };

  return (
    <div className="mailMainBody" ref={mailHolder}>
      <div className="w-[50%] overflow-scroll" >
        {inProcess &&
          [1, 3, 4, 2, 2, 2, 2].map((value) => (
            <div className="mailItem" key={value} style={{ height: "auto" }}>
              <Skeleton />
              {/* <Skeleton
              avatar={true}
              paragraph
              title={true}
              active={true}
              shape={"round"}
              loading={inProcess}
              block={true}
              style={{ margin: "10px 10px" }}
            ></Skeleton> */}
            </div>
          ))}

        {!isTablet &&
          !inProcess &&
          allMail?.map((item) => (
            <MailItem
              data={item}
              key={item.id}
              changeSeenFlag={changeSeenFlag}
              handleClick={handleClick}
            />
          ))}

        {isTablet &&
          !inProcess &&
          allMail?.map(
            ({
              from,
              body,
              id,
              subject,
              content,
              isRead,
              date,
              hasAttachments,
            }) => (
              <div
                className="mailItemMob"
                key={id}
                style={{
                  backgroundColor: !isRead && "#e5e5e594",
                }}
              >
                <div className="checkBx-mobile">
                  <Checkbox onChange={() => console.log("checked")} />
                </div>

                <NavLink
                  className="subjectAndBodyMob"
                  to={`${id}`}
                >
                  <div className="mailForm">
                    <div className="subject">{from[0].name}</div>

                    {hasAttachments && (
                      <div>
                        <img
                          src={mailAttachmentIcon}
                          alt="mailAttachmentIcon"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mobile-subject-body">{subject}</div>
                  <div className="mobile-mail-body">{content}</div>
                </NavLink>

                <div className="end-date-box">
                  <div>{parseDateWithMontAndYear(parseDate(date))}</div>
                  <div>
                    <AntTooltip
                      value={!isRead ? "Mark as read" : "Mark as unread"}
                      placement="bottom"
                      color={"#FFFFFF"}
                    >
                      <Rate
                        count={1}
                        // defaultValue={!isRead}
                        onChange={() => changeSeenFlag(id, isRead ? 2 : 1)}
                        value={!isRead}
                        style={{
                          fontSize: "16px",
                          color: "var(--currentThemeColor)",
                        }}
                      />
                    </AntTooltip>
                  </div>
                </div>
              </div>
            )
          )}
      </div>

      <div className="w-[50%]" >
        <MailDetailView
          detailIdByProps={selectedMail}
          folderIdByProps={api_base}
        />
      </div>

    </div>
  );
};

export default MailListing;
