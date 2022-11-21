import { Progress, Tag ,Skeleton } from "antd";
import React, { useContext, useEffect } from "react";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { Rate } from "antd";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";

import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { useDispatch } from "react-redux";
import { getTaskById } from "../../store/actions";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import TaskMembers from "./taskMembers";
import "./style.css";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { taskDictionary } from "../../localization";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { cancelTaskAction } from "../../store/actions";
import { Drawer, Image, Button } from "antd";

function TaskDetail() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction } = dictionaryList[userLanguage];
  const { taskDictionaryList } = taskDictionary[userLanguage];
  const { labels } = taskDictionaryList;
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getTaskById(id));
  }, []);

  const { loadingData } = useSelector((state) => state.taskSlice);
  const taskDetail = useSelector((state) => state.taskSlice.taskdetail);
  const { user } = useSelector((state) => state.userSlice);
  let userId = user.id;
  console.log(userId, "userid");

  if (!taskDetail) return <div></div>;
  let {
    InProcess,
    Approved,
    Declined,
    Resend,
    Inactive,
    NotRequired,
    Cancelled,
    ApprovalRequired,
    Hold,
    NoStatus,
  } = ApprovalStatus;
  const {
    subject,
    description,
    referenceNo,
    rating,
    startDate,
    endDate,
    progress,
    members,
    creator,
    status,
    predecessor,
  } = taskDetail;

  let classes = "card-list-item ";
  classes += Direction === "rtl" ? "rtl" : "ltr";
  const handleCancel = (e, payload) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(cancelTaskAction(payload));
  };
  
  if(loadingData) return <Skeleton />;

  return (
    <TabbableContainer>
      <ContBody>
        <div className={classes + " h-max w-full"}>
          <div className="card-item-header">
            <div className="left">
              <UserInfo
                avatarSrc={creator.image}
                name={creator.name}
                Subline={
                  <SublineDesigWithTime
                    designation={
                      creator.designation
                        ? creator.designation
                        : "Not Designated"
                    }
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
              <Button className="ThemeBtn" onClick={(e) => handleCancel(e, id)}>
                Cancel
              </Button>
            </div>
          </div>

          <div className="w-full mt-5">
            <div className="card-item-body-main">
              <div className="flex justify-between">
                <div className="pr-6">
                  <div className="card-item-body !w-full">
                    <div className="left">
                      <div className="card-Title-1">{subject}</div>
                      <p className="card-desc-1">
                        {description} dksjksjkdjs sdjksjdkjs sdkjksjksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs dksjksjkdjs sdjksjdkjs sdkjksj ksdjksd
                        jskdkjsdkjs
                      </p>
                    </div>

                    <div className="right"></div>
                  </div>
                  <div className="card-column-view">
                    {/* <div className="card-column-item">
                                            <div className="column-item-head"> {labels.assignTo} </div>
                                            <div className="SummaryMembers">
                                                <div className="mem">
                                                    <Avatar
                                        isAvatarGroup={true}
                                        isTag={false}
                                        heading={"Members"}
                                        membersData={members}
                                        image={"https://joeschmoe.io/api/v1/random"}
                                    /> 
                                                </div>
                                            </div>
                                        </div> */}
                    <div className="column-item-head">
                      <span>{labels.predecessor}</span>
                      <div className="st-tag"> {predecessor} </div>
                    </div>

                    <div className="column-item-head">
                      <span>{labels.startDate}</span>
                      <div className="st-tag">
                        {moment(startDate).format("MMM Do YYYY")}{" "}
                      </div>
                    </div>

                    <div className="column-item-head">
                      <span>{labels.endtDate}</span>
                      <div className="st-tag">
                        {" "}
                        {moment(endDate).format("MMM Do YYYY")}
                      </div>
                    </div>

                    <div className="column-item-head">
                      {/* <FilePreview files={}/> */}
                    </div>
                  </div>
                  <div>
                    <Progress strokeColor="#1b5669" percent={progress} />
                  </div>
                </div>
                <div className="">
                  {members && <TaskMembers members={members} />}
                </div>
              </div>
            </div>
          </div>
          <div className="m-5">
            <CommentWrapper
              initailComments={[]}
              referenceId={id}
              module={2}
              isCommentLoad={true}
            />
          </div>
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default TaskDetail;
