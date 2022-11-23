import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    {
      title: "Sort",
      dataIndex: "sort",
      drag: true,
      width: 80,
    },
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      sort: true,
      width: 100,
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
    {
      title: "Promotion To",
      dataIndex: "member",
      render: (member) => member.name,
      sort: true,
      width: 200,
    },
    {
      title: "Date",
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
      width: 200,
    },
    {
      title: "Approvers",
      dataIndex: "approvers",
      ellipsis: true,
      width: 200,
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
    },
  ];
};
