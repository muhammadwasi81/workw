import React, { useState } from "react";
import moment from "moment";
import {
  ItemContent,
  ItemContentCareers,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import { Divider, Modal, Rate } from "antd";
import AvatarCustom from "../../../../../sharedComponents/Avatar/avatarOLD";
import CardProfileTopView from "../../../../travel/view/ListView/CardProfileTopView";
import { Table } from "../../../../../sharedComponents/customTable";
import { tableColumn } from "../SubmitAppraisal/TableColumn";
import DetailedView from "../DetailedView";
import QuestionList from "./questionList";
import TaskList from "./TaskList";

function ShortCard({ item, isList }) {
  const [openQuestion, setOpenQuestion] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [detailId, setDetailId] = useState(null);

  const {
    id,
    approverStatus,
    approvers,
    comment,
    createdBy,
    creator,
    endDate,
    questions,
    ratingAssign,
    startDate,
    status,
    tasks,
    user,
    userId,
    referenceNo,
    bonus,
    basicSalary,
  } = item;

  const onClickQuestionTag = (e) => {
    e.stopPropagation();
    setOpenQuestion(true);
  };

  const onClickTaskTag = (e) => {
    e.stopPropagation();
    setOpenTask(true);
  };

  const onClickAppraisalCard = (e) => {
    if (isList) {
      e.stopPropagation();
      setDetailId(id);
    } else {
      console.log("not listed");
    }
  };

  const onClose = () => {
    setDetailId(null);
  };
  return (
    <>
      <DetailedView id={detailId} onClose={onClose} />
      <Modal
        title="Question"
        centered
        open={openQuestion}
        onCancel={() => setOpenQuestion(false)}
        width={800}
        footer={null}
      >
        <QuestionList questions={questions} />
      </Modal>
      <Modal
        title="Task"
        centered
        open={openTask}
        onCancel={() => setOpenTask(false)}
        width={800}
        footer={null}
      >
        <TaskList tasks={tasks} />
      </Modal>
      <SingleItem className="cursor-pointer" onClick={onClickAppraisalCard}>
        <CardProfileTopView
          profileImgSrc={
            <AvatarCustom
              width={40}
              height={40}
              src={creator?.image}
              name={creator?.name}
              round
            ></AvatarCustom>
          }
          createDate={startDate}
          isPublic={true}
          name={creator?.name}
          destination={
            creator && creator.designation
              ? creator.designation
              : "Not Designated"
          }
          refNo={referenceNo}
          status={status}
          profileImgSize={40}
        />
        <ItemContentCareers className="!h-[100px] !max-h-[100px]">
          <div className="font-bold text-[14px] text-primary-color">
            {"Comments"}
          </div>
          {/* <p className="careerFooterText">
            {city}, {country}
          </p> */}
          <p className="careersDescShort">{comment}</p>
          {/* <div className="mt-5 skillsContainer">
            <div className="font-bold">{labels.skillsRequired}</div>
            <div>
              {skills
                ? skillsArray?.map((item, index) => {
                    return <Tag className="LinkTag">{item}</Tag>;
                  })
                : null}
            </div>
          </div> */}
        </ItemContentCareers>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Appraised of"}</div>
            <div className="cardSection__body">{user?.name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Created Date"}</div>
            <div className="cardSection__body">
              {moment(startDate).format("Do MMM YY")}
            </div>
          </div>
          {/* <div className="cardSectionItem">
            <div className="cardSection__title">
              {labels.experienceRequired}
            </div>
            <div className="cardSection__body">{experience}</div>
          </div> */}
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Bonus"}</div>
            <div className="cardSection__body">
              {" "}
              {bonus ? Math.round(parseInt(bonus)) : "0"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Increment"}</div>
            <div className="cardSection__body">
              {" "}
              {basicSalary ? basicSalary : "0"}
            </div>
          </div>
          {/* <div className="cardSectionItem">
            <div className="cardSection__title">{labels.manager}</div>
            <div className="cardSection__body">
              {manager && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Managers"}
                  membersData={manager ? mangerArrFunc(manager) : []}
                  text={"manager"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div> */}
          {/* <div className="cardSectionItem">
            <div className="cardSection__title">{labels.members}</div>
            <div className="cardSection__body">
              {" "}
              {members && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={labels.members}
                  membersData={members ? members : []}
                  text={"member"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div> */}
          {/* <div className="cardSectionItem">
            <div className="cardSection__title">{labels.interviewers}</div>
            <div className="cardSection__body">
              {interviewers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Users"}
                  membersData={interviewers ? interviewers : []}
                  text={"user"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div> */}
          {/* <div className="cardSectionItem">
            <div className="cardSection__title">{labels.postInterviewers}</div>
            <div className="cardSection__body">
              {postInterviewers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Users"}
                  membersData={postInterviewers ? postInterviewers : []}
                  text={"user"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div> */}
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Approvers"}</div>
            <div className="cardSection__body">
              {approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={approvers ? approvers : []}
                  // membersData={[]}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Questions"}</div>
            <div className="cardSection__body">
              <div
                className="singleTag"
                onClick={onClickQuestionTag}
              >{`Questions(${questions.length})`}</div>
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Tasks"}</div>
            <div className="cardSection__body">
              {" "}
              <div
                className="singleTag"
                onClick={onClickTaskTag}
              >{`Tasks(${tasks.length})`}</div>
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ShortCard;
