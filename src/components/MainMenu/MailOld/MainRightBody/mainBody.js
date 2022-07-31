import React, { useEffect, useRef } from "react";
import { NavLink, useLocation, Route } from "react-router-dom";
import { Checkbox, Rate, Skeleton } from "antd";
import {
  parseDate,
  parseDateWithMontAndYear,
  STRINGS,
} from "../../../../utils/base";
import { useMediaQuery } from "react-responsive";
import mailAttachmentIcon from "../assests/mailAttachmentIcon.svg";
import MailDetail from "./mailDetail";
import MailBodyHeader from "../Header/mailBodyHeader";
import { useDispatch, useSelector } from "react-redux";
import { changeMailSeenFlag, getAllMail, getMailFolders } from "../Store/Api";
import AntTooltip from "../../../SharedComponent/Tooltip/AntTooltip";
import MailItem from "./mailItem";

const MainBody = () => {
  const dispatch = useDispatch();

  let {
    allMail,
    currentParamId,
    inProcess,
    currentPageSize,
    mailDetail,
  } = useSelector((state) => state?.mailSlice);

  const isTablet = useMediaQuery({ maxWidth: 599 });

  const { pathname } = useLocation();

  const api_base = pathname.split("/")[2];

  const mailHolder = useRef();

  let objData = {
    folderPath: api_base,
    pageNo: currentPageSize,
    pageSize: 25,
    search: "",
  };
  useEffect(() => {
    dispatch(getMailFolders());
  }, [dispatch]);

  const GetAllMailHandle = () => {
    handlePagination(false);
    if (mailDetail === null) dispatch(getAllMail(objData));

    if (!inProcess) {
      handlePagination(true);
    }
  };

  useEffect(() => {
    GetAllMailHandle();
  }, [currentParamId]);

  const changeSeenFlag = (ID, IsRead) => {
    dispatch(
      changeMailSeenFlag({ uid: ID, flag: IsRead, folderPath: api_base })
    );
  };

  const handlePagination = (doPagination = true) => {};

  return (
    <div className="mailMainBody" ref={mailHolder}>
      <Route path={`${STRINGS.ROUTES.MAIL.DEFAULT}/${api_base}`}>
        {inProcess &&
          [1, 3, 4].map((value) => (
            <div className="mailItem" key={value} style={{ height: "auto" }}>
              <Skeleton
                avatar={true}
                paragraph
                title={true}
                active={true}
                shape={"round"}
                loading={inProcess}
                block={true}
                style={{ margin: "10px 10px" }}
              ></Skeleton>
            </div>
          ))}

        {!isTablet &&
          !inProcess &&
          allMail?.map((item) => (
            <MailItem
              data={item}
              key={item.id}
              changeSeenFlag={changeSeenFlag}
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
                  to={`${STRINGS.ROUTES.MAIL.DEFAULT}/${api_base}/${id}`}
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
                          color: "var(--primary_theme_color_green)",
                        }}
                      />
                    </AntTooltip>
                  </div>
                </div>
              </div>
            )
          )}
      </Route>

      {/*** For mail detail content with route ***/}
      <Route path={`${STRINGS.ROUTES.MAIL.DEFAULT}/${api_base}/:id`}>
        <MailBodyHeader />
        <MailDetail />
      </Route>
    </div>
  );
};

export default MainBody;
