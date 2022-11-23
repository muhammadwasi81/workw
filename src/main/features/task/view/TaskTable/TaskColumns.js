import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      width: 80,
      sort: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
      width: 100,
    },
    { title: "Subject", dataIndex: "subject", sort: true, width: 200 },
    { title: "Progress", dataIndex: "progress", sort: true, width: 200 },

    {
      title: "Task Assigned To",
      dataIndex: "members",
      render: (member) => <Avatar membersData={member} heading={"Members"} />,
      width: 200,
    },
  ];
};
