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
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
      width: 200,
    },
    {
      title: taskDictionaryList.labels.status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
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
