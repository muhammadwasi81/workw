import React, { useEffect } from "react";
// import Avatar from "../../../SharedComponent/Avatar/avatar";
// import SharedButton from "../../../SharedComponent/button/";
import replyIcon from "../assests/replyIcon.svg";
import forwardIcon from "../assests/forwardIcon.svg";
import { useMediaQuery } from "react-responsive";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMailById } from "../Store/Api";
import {
  createGuid,
  getRelativeTime,
  parseDate,
  parseDateAndTime,
} from "../../../../utils/base";
import { Skeleton, Spin } from "antd";
import SharedButton from "../../../sharedComponents/button";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { handleMailComposer } from "../Store/MailSlice";

const MailDetail = () => {
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const dispatch = useDispatch();
  const { mailDetail, mailComposerInstances } = useSelector(
    (state) => state?.mailSlice
  );
  const { subject, content, date, from } = mailDetail || {};
  const { name, address } = (from && from[0]) || [];
  let { detailId, id } = useParams();
  const { pathname } = useLocation();
  const api_base = pathname.split("/")[2];
  console.log(useParams(), "$$$$$$");
  useEffect(() => {
    dispatch(getMailById({ id: detailId, folderPath: id }));
  }, [detailId]);

  const handleComposer = (isReply = false, isForward = false) => {
    const id = createGuid();
    const temArr = [...mailComposerInstances];

    const obj = {
      id,
      isMax: false,
      isMinimize: false,
      isReply,
      isForward,
      data: mailDetail,
    };
    temArr.push(obj);

    if ([...mailComposerInstances].length >= 3) {
    } else {
      dispatch(handleMailComposer(temArr));
    }
  };

  return (
    <div className="mBodyContainer">
      {mailDetail && (
        <>
          <div className="mbodySubject">
            <div className="subject">{subject}</div>
            {/* <SharedButton
                        type="default"
                        onClick={() => {
                        }}
                        shape="square"
                        size={"small"}
                        icon={printIcon}
                        IconSize={20}
                        toolTip={"print all"}
                    />*/}
          </div>
          <div className="mBodyMessage">
            <div className="head">
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <Avatar src={null} round name={name} size={45} />
                <div className="headRight">
                  <div className="from">{address}</div>
                  <div className="forMeMore">to me</div>
                </div>
              </div>

              <div className="headLeft">
                <div className="date">
                  {parseDateAndTime(parseDate(date))}{" "}
                  {`( ${getRelativeTime(parseDate(date))} )`}
                </div>

                {/* <div>
                                <SharedButton
                                    type="default"
                                    onClick={() => {
                                    }}
                                    shape="square"
                                    size={"small"}
                                    icon={startIcon}
                                    IconSize={18}
                                    toolTip={"star"}
                                /></div>
                            <div>
                                <SharedButton
                                    type="default"
                                    onClick={() => {
                                    }}
                                    shape="square"
                                    size={"small"}
                                    icon={replyIcon}
                                    IconSize={18}
                                    toolTip={"reply"}
                                />
                            </div>
                            <div>
                                <SharedButton
                                    type="default"
                                    onClick={() => {
                                    }}
                                    shape="square"
                                    size={"small"}
                                    icon={moreOption}
                                    IconSize={18}
                                    toolTip={"more"}
                                />
                            </div>
*/}
              </div>
            </div>
            <div className="body">
              <iframe
                src={"data:text/html," + encodeURIComponent(content)}
                style={{
                  display: "flex",
                  width: "100%",
                  height: "inherit",
                  border: "none",
                  outline: "none",
                  backgroundColor: "white",
                }}
                title="body"
              />
            </div>
          </div>
          <div className="mBodyFooter">
            <SharedButton
              type=""
              onClick={() => handleComposer(true)}
              shape="square"
              size={isTablet ? "middle" : "large"}
              icon={replyIcon}
              IconSize={18}
              title="Reply"
              style={{
                color: "#757d86",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            />
             <SharedButton
              type=""
              onClick={() => handleComposer(true)}
              shape="square"
              size={isTablet ? "middle" : "large"}
              icon={replyIcon}
              IconSize={18}
              title="Reply All"
              style={{
                color: "#757d86",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            />
            <SharedButton
              type=""
              onClick={() => handleComposer(false, true)}
              shape="square"
              size={isTablet ? "middle" : "large"}
              icon={forwardIcon}
              IconSize={18}
              title="Forward"
              style={{ color: "#757d86", borderRadius: "8px" }}
            />
          </div>
        </>
      )}
      {!mailDetail && (
        <div
          style={{ padding: "30px 100px" }}
          // style={{display: "flex", height: "100vh", alignItems: "center", justifyContent: "center"}}
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
          {/* <Spin/> */}
        </div>
      )}
    </div>
  );
};

export default MailDetail;
