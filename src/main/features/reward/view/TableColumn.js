import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    // {
    //   title: "Sort",
    //   dataIndex: "sort",
    //   drag: true,
    //   width: 80,
    // },
    {
      title: "Reference No",
      dataIndex: "referenceNo",

      sort: true,
      width: 200,
    },
    {
      title: "Creator",
      dataIndex: "creator",

      width: 200,

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
      width: 200,
    },
    {
      title: "Category",
      dataIndex: "category",
      sort: true,
      width: 200,
    },
    { title: "Name", dataIndex: "name", width: 200, sort: true },
    { title: "Reason", dataIndex: "reason", width: 200, sort: true },
    {
      title: "Date",
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
      width: 200,
    },

    {
      title: "Reward To",
      dataIndex: "members",
      width: 200,
      render: (member) => <Avatar membersData={member} heading={"Members"} />,
    },
    {
      title: "Approvers",
      dataIndex: "approvers",
      width: 200,
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
    },
  ];
};
