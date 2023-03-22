import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (complainDictionary) => {
  return [
    // {
    //   title: "Sort",
    //   dataIndex: "sort",
    //   drag: true,
    //   width: 80,
    // },
    {
      title: complainDictionary.referenceNo,
      dataIndex: "referenceNo",
      width: 200,
      sort: true,
    },
    {
      title: complainDictionary.creator,
      dataIndex: "creator",
      width: 200,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: complainDictionary.status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    {
      title: complainDictionary.category,
      dataIndex: "category",
      sort: true,
      width: 200,
    },

    {
      title: complainDictionary.date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
    },

    {
      title: complainDictionary.complainOf,
      dataIndex: "members",
      render: (member) => <Avatar membersData={member} heading={"Members"} />,
      width: 200,
    },
    {
      title: complainDictionary.approvers,
      dataIndex: "approvers",
      width: 200,
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
    },
  ];
};
