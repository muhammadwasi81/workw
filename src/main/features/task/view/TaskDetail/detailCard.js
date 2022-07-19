import { Progress, Tag } from "antd";
import React, { useContext, useEffect } from "react";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { Rate } from "antd";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { taskDictionary } from "../../utils/localization";
import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { useDispatch } from "react-redux";
import { getTaskById } from "../../store/actions";
import { ContBody, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";

function TaskDetail({ item = {
    subject: "gfg",
    description: "fgfg",
    referenceNo: "fgfg",
    rating: 5,
    startDate: new Date(),
    endDate: new Date(),
    progress: 10,
    members: [],
    creator: {
        name: "fdfdf"
    }
} }) {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { sharedLabels, Direction } = dictionaryList[userLanguage];
    const { taskDictionaryList } = taskDictionary[userLanguage];
    const { labels } = taskDictionaryList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTaskById("4de79528-1f4d-4c1e-9b18-0826fe6beb25"))
    }, [])
    const {
        subject,
        description,
        referenceNo,
        rating,
        startDate,
        endDate,
        progress,
        members = [],
        creator
    } = item;

    let classes = "card-list-item ";
    classes += Direction === "rtl" ? "rtl" : "ltr";
    return (
        <TabbableContainer>
        <ContBody>
            <div className={classes + " h-max w-full"} >
                <div className="card-item-header">
                    <div className="left">
                        <UserInfo
                            avatarSrc={creator.image}
                            name={creator.name}
                            Subline={
                                <SublineDesigWithTime
                                    designation={creator.designation ? creator.designation : "Not Designated"}
                                // time="2 days ago"
                                />
                            }
                        />
                    </div>

                    <div className="right">
                        <div className="rating">
                            <Rate allowHalf defaultValue={rating} />
                        </div>
                        <div className="labels">
                            <span className="taskID">{referenceNo}</span>
                            <span className="priority high">{labels.high}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card-item-body-main">
                        <div className="card-item-body">
                            <div className="left">
                                <div className="card-Title-1">
                                    {subject}
                                </div>
                                <p className="card-desc-1">
                                    {description}
                                </p>
                            </div>

                            <div className="right"></div>
                        </div>

                        <div className="card-column-view">
                            <div className="card-column-item">
                                <div className="column-item-head"> {labels.assignTo} </div>
                                <div className="SummaryMembers">
                                    <div className="mem">
                                        {/* <Avatar
                                        isAvatarGroup={true}
                                        isTag={false}
                                        heading={"Members"}
                                        membersData={members}
                                        image={"https://joeschmoe.io/api/v1/random"}
                                    /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="column-item-head">
                                <span>{labels.predecessor}</span>
                                <div className="st-tag"> Helpers UI </div>
                            </div>

                            <div className="column-item-head">
                                <span>{labels.startDate}</span>
                                <div className="st-tag">{moment(startDate).format("MMM Do YYYY")} </div>
                            </div>

                            <div className="column-item-head">
                                <span>{labels.endtDate}</span>
                                <div className="st-tag"> {moment(endDate).format("MMM Do YYYY")}</div>
                            </div>

                            <div className="column-item-head">
                                {/* <FilePreview files={}/> */}
                            </div>
                        </div>
                        <div>
                            <Progress strokeColor="#1b5669" percent={progress} />
                        </div>
                    </div>
                </div>
            </div>
        </ContBody>
        </TabbableContainer>
    );
}

export default TaskDetail;