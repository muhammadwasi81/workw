import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (requisitionDictionary) => {
  return [
    {
      title: requisitionDictionary.referenceNo,
      dataIndex: "referenceNo",
      sort: true,
    },
    {
      title: requisitionDictionary.creator,
      dataIndex: "creator",
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: requisitionDictionary.Status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },

    { title: requisitionDictionary.name, dataIndex: "name", sort: true },
    { title: requisitionDictionary.reason, dataIndex: "reason", sort: true },
    {
      title: requisitionDictionary.date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
    },

    {
      title: requisitionDictionary.approvers,
      dataIndex: "approvers",
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
    },
  ];
};
