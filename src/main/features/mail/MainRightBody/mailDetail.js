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
import { Button, Popover, Skeleton, Spin } from "antd";
import SharedButton from "../../../sharedComponents/button";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { handleMailComposer } from "../Store/MailSlice";
import { BsInbox } from "react-icons/bs";
import {
    CaretDownOutlined
  } from '@ant-design/icons';

const fromContent = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
);

const MailDetail = ({detailIdByProps}) => {
    const isTablet = useMediaQuery({ maxWidth: 768 });
    const dispatch = useDispatch();
    const { mailDetail, mailComposerInstances } = useSelector(
        (state) => state?.mailSlice
    );
    const { subject, content, date, from, to } = mailDetail || {};
    const { name, address } = (from && from[0]) || [];
    // const { object } = (to && to[0]) || [];
    let { detailId, id } = useParams();

    console.log(to, "JANI YEH HI HAI")

    let mailId = detailIdByProps ? detailIdByProps : detailId;

    console.log(name, "TO OBJECT")
    // const FolderTypeEnum = {
    //     INBOX.Sent,

    // }

    useEffect(() => {
        mailId && dispatch(getMailById({ id: mailId, folderPath: id }));
    }, [mailId]);

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

    // console.log(mailDetail, "MAIL DETAIL")


    return (
        <div className="mBodyContainer">
            {mailDetail && (
                <>
                    <div className="mbodySubject">
                        <div className="subject"><h2 style={{fontSize: "20px"}} >{subject}</h2></div>
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
                                    <div className="from">{name}</div>
                                    <div className="forMeMore">
                                        <Popover
                                            content={
                                                    to.map((item) => {
                                                        return (
                                                            <div className="detailPopup">
                                                                <div className="flex">
                                                                    <div className="innerColumn" style={{textAlign: "right"}}>
                                                                        <div><span>from :</span> &nbsp; &nbsp;</div>
                                                                        <div><span>to :</span> &nbsp; &nbsp;</div>
                                                                        <div><span>subject :</span> &nbsp; &nbsp;</div>
                                                                    </div>
                                                                    <div className="innerColumn">
                                                                        <div>{name} ( {address} )</div>
                                                                        <div>{item.address}</div>
                                                                        <div>{subject}</div>
                                                                    </div>
                                                                </div>
                                                                {/* <div>
                                                                    {item.address}
                                                                </div> */}
                                                        </div> 
                                                        )
                                                    })
                                                } 
                                        placement="bottomRight"
                                        trigger="click">
                                            { id === "INBOX.Sent" ? 
                                                <div> to <CaretDownOutlined /></div> 
                                            : 
                                            <div> to me <CaretDownOutlined /></div> }   
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="headLeft">
                                <div className="date" style={{fontSize: "11px"}}>
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
            {mailDetail === null && (
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
