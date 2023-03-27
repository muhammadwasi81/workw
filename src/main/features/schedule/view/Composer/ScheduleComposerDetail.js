import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleMemberType } from "../../enum/enum";
import {
  addScheduleMemberAction,
  getScheduleById,
  updateMemberScheduleStatus,
  updateScheduleMemberType,
} from "../../store/action";
import EventDetail from "../../UI/EventDetail";
import Event from "../event";

import ScheduleMembersList from "../Composer/ScheduleMembersList";
import ScheduleDetailSkeleton from "./ScheduleDetailSkeleton";
import { PlusSquareOutlined } from "@ant-design/icons";
// import { EditOutlined } from "@ant-design/icons";
// import CreateSchedule from "../createSchedule";
import { Button } from "antd";
import UpdateSchedule from "./UpdateSchedule";
import Attachments from "../../../travel/view/UI/Attachments";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import ItemDetailModal from "../../../../sharedComponents/ItemDetails";
import { handleItemDetailModal } from "../../../../../utils/Shared/store/slice";

function ScheduleComposerDetail({ id, shortEvent = true }) {
  const eventDetail = useSelector((state) => state.scheduleSlice.eventDetail);
  const loading = useSelector((state) => state.scheduleSlice.loading);
  const loggedInUserId = useSelector((state) => state.userSlice.user.id);
  const [isActionEnabled, setIsActionEnabled] = useState(false);
  const [editSchedule, setEditSchedule] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScheduleById(id));
  }, [id]);

  useEffect(() => {
    if (eventDetail && Object.keys(eventDetail).length > 0) {
      for (let index = 0; index < eventDetail.members.length; index++) {
        // const element = array[index];
        if (
          eventDetail.members[index].memberType === ScheduleMemberType.Admin &&
          loggedInUserId === eventDetail.members[index].memberId
        ) {
          setIsActionEnabled(true);
        }
      }
    }
  }, [eventDetail]);

  // console.log("eventDetail", eventDetail);
  // console.log("isActionEnabled", isActionEnabled);

  const handleMemberStatusChange = (id, status) => {
    dispatch(
      updateMemberScheduleStatus({
        id,
        status,
      })
    );
  };
  const handleMemberTypeStatusChange = (id, type) => {
    dispatch(
      updateScheduleMemberType({
        id,
        type,
      })
    );
  };
  const handleEditSchedule = () => {
    setEditSchedule(!editSchedule);
  };

  const addFunc = (memberId) => {
    console.log(eventDetail.id, "eventDetail id");
    console.log(memberId, "APPROVER ID");
    // if (eventDetail?.members.includes(memberId[0])) {
    //   return message.error('Member already existed');
    // }
    const payload = {
      data: [{ memberId: memberId[0], memberType: 1 }],
      id: eventDetail.id,
    };
    console.log(payload, "PAYLOAD!!!");
    // here add schedule member api will be called
    dispatch(addScheduleMemberAction(payload));
  };

  return (
    <>
      <ItemDetailModal
        data={[]} //Data of members will pass here in array
        isDeleteDisabled={true} //Pass true to hide delete icon
        addEnabled={true} //Pass false to hide select member
        addFunc={addFunc} // define and pass addMember action of particular members
        onDelete={false} // define and pass onDeletemember actions of particular members
        isSearch={false} //Pass true if you want to search the list
        openModal={true} // pass true if you want to open member details in modal other wise it display in listing
      />
      {loading ? (
        <ScheduleDetailSkeleton />
      ) : (
        <>
          <div className={`eventDetail ${!shortEvent && ""}`}>
            {shortEvent && (
              <div className="eventDetail__header">
                <p className="eventDetail-title">Details</p>
                {/* <span className="eventNum">SCH-000085</span> */}
                <Button className="ThemeBtn" onClick={handleEditSchedule}>
                  Update
                </Button>
                {/* <Tooltip title="Edit Schedule">
										<EditOutlined
											className="!text-primary-color cursor-pointer"
											onClick={() => {
												setEditSchedule(true);
											}}
										/>
									</Tooltip> */}
              </div>
            )}
            <div className="eventDetail__body">
              <div className="eventDetail__body-event">
                {shortEvent ? (
                  <Event shortDesc={true} data={eventDetail} />
                ) : (
                  <EventDetail data={eventDetail} />
                )}
              </div>
              {!shortEvent && (
                <div className="eventDetail__body-description">
                  <p className="eventDetail-title">Description</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: eventDetail?.description,
                    }}
                    className="break-words dangerous_element_detail"
                  />
                </div>
              )}
            </div>
            {eventDetail?.attachments?.length > 0 ? (
              <>
                <div className="eventDetail-title">Attachments</div>
                <div className="!w-max m-4">
                  <Attachments
                    data={eventDetail?.attachments}
                    key={{ data: eventDetail?.attachments }}
                    toShow={1}
                    onClick={() => {}}
                    size={"50px"}
                  />
                </div>
              </>
            ) : null}
            <div className="eventDetail-title flex justify-between items-baseline">
              <div>Members</div>
              <PlusSquareOutlined
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(handleItemDetailModal(true));
                }}
              />
            </div>
            {eventDetail?.members?.map((member) => (
              <ScheduleMembersList
                status={member.status}
                id={member.id}
                data={member?.member}
                memberType={member.memberType}
                isActionEnabled={isActionEnabled}
                handleMemberStatusChange={handleMemberStatusChange}
                handleMemberTypeStatusChange={handleMemberTypeStatusChange}
              />
            ))}
          </div>
          <CommentWrapper
            referenceId={eventDetail?.id}
            isCommentLoad={true}
            module={9}
            // loadSkeleton={true}
          />
        </>
      )}
      <UpdateSchedule
        eventDetail={eventDetail}
        handleEditSchedule={handleEditSchedule}
        isOpen={editSchedule}
      />
    </>
  );
}

export default ScheduleComposerDetail;
