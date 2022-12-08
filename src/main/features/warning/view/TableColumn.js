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
      title:  tables.ReferenceNum,
      dataIndex: "referenceNo",
      sort: true,
      width: 200,
    },
    {
      title:  tables.Creator,
      dataIndex: "creator",
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      width: 200,
      sort: true,
    },
    {
      title: tables.Status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
      width: 200,
    },
    {
      title: tables.Category,
      dataIndex: "category",
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
      title: tables.warningTo,
      dataIndex: "members",
      width: 200,
      render: (member) => <Avatar membersData={member} heading={"Members"} />,
    },
    {
      title:  tables.Approvers,
      dataIndex: "approvers",
      width: 200,
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
    },
  ];
};
