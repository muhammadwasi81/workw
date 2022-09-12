import { Slider } from "antd";
import React from "react";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import { updateUserTaskMemberProgressService } from "../../utils/services/service";

export default function TaskMembers({ members, changeOnProgress }) {
  const handleProgressSlider = async (progress, member) => {
    const { taskId, memberId, memberType } = member;
    const request = {
      progress,
      taskId,
      memberId,
      memberType,
    };
    const { data } = await updateUserTaskMemberProgressService(request);
    // console.log(response, "response");
    changeOnProgress(data);
  };

  return (
    <div className="taskMembers">
      {members.map((item) => (
        <div>
          <UserInfo
            avatarSrc={item.member.image}
            name={item.member.name}
            nameStyle={{ fontSize: "12px" }}
            avatarSize={36}
            Subline={
              <SublineDesigWithTime
                designation={
                  item.member.designation
                    ? item.member.designation
                    : "Not Designated"
                }
                desgStyle={{ fontSize: "6px !import" }}
              />
            }
          />
          <Slider
            defaultValue={item.progress}
            trackStyle={{ backgroundColor: "var(--currentThemeColor)" }}
            handleStyle={{
              borderColor: "var(--currentThemeColor)",
              backgroundColor: "var(--currentThemeColor)",
            }}
            onAfterChange={(progress) => {
              handleProgressSlider(progress, item);
            }}
          />
        </div>
      ))}
    </div>
  );
}
