import { Progress } from "antd";
import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (taskDictionaryList) => {
  return [
    {
      title: taskDictionaryList.labels.referenceNo,
      dataIndex: "referenceNo",
      width: 80,
      sort: true,
    },
    {
      title: taskDictionaryList.labels.creator,
      dataIndex: "creator",
      render: (creator) => (
        <TagAvatar
          text={creator.name}
          img={
            creator.image
              ? creator.image
              : "https://konnect.im/upload/2022/10/88c35581-97aa-4e88-be91-584a667fd5eb.jpg"
          }
        />
      ),
      sort: true,
      width: 200,
    },
    {
      title: taskDictionaryList.labels.status,
      dataIndex: "progress",
      render: (progress) => <Progress percent={progress} />,
      sort: true,
      width: 100,
    },
    {
      title: taskDictionaryList.labels.subject,
      dataIndex: "subject",
      sort: true,
      width: 200,
    },
    {
      title: taskDictionaryList.labels.progress,
      dataIndex: "progress",
      sort: true,
      width: 200,
    },

    {
      title: taskDictionaryList.labels.taskAssignedTo,
      dataIndex: "members",
      render: (member) => <Avatar membersData={member} heading={"Members"} />,
      width: 200,
    },
  ];
};
