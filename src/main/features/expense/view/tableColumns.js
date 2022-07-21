import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    { title: "Subject", dataIndex: "subject", ellipsis: true, sort: true },
    { title: "Progress", dataIndex: "progress", ellipsis: true, sort: true },

    // {
    //   title: "Task Assigned To",
    //   dataIndex: "members",
    //   ellipsis: true,
    //   render: (member) => <Avatar membersData={member} heading={"Members"} />,
    // },
  ];
};
