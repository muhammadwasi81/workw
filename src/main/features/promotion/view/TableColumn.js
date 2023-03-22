import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (tables) => {
  return [
    {
      title: tables.sort,
      dataIndex: "sort",
      drag: true,
      width: 80,
    },
    {
      title: tables.ReferenceNum,
      dataIndex: "referenceNo",
      sort: true,
      width: 100,
    },
    {
      title:tables.Creator,
      dataIndex: "creator",
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
      width: 200,
    },
    {
      title: tables.Status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
      width: 100,
    },
    {
      title: tables.promotionTo,
      dataIndex: "member",
      render: (member) => member.name,
      sort: true,
      width: 200,
    },
    {
      title: tables.Date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
      width: 200,
    },
    {
      title: tables.Approvers,
      dataIndex: "approvers",
      ellipsis: true,
      width: 200,
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
    },
  ];
};
