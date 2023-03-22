import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (rewardDictionary) => {
  return [
    // {
    //   title: "Sort",
    //   dataIndex: "sort",
    //   drag: true,
    //   width: 80,
    // },
    {
      title: rewardDictionary.referenceNo,
      dataIndex: "referenceNo",
      sort: true,
      width: 200,
    },
    {
      title: rewardDictionary.creator,
      dataIndex: "creator",

      width: 200,

      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: rewardDictionary.status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
      width: 200,
    },
    {
      title: rewardDictionary.category,
      dataIndex: "category",
      sort: true,
      width: 200,
    },
    {
      title: rewardDictionary.name,
      dataIndex: "name",
      width: 200,
      sort: true,
    },
    {
      title: rewardDictionary.reason,
      dataIndex: "reason",
      width: 200,
      sort: true,
    },
    {
      title: rewardDictionary.date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
      width: 200,
    },

    {
      title: rewardDictionary.rewardTo,
      dataIndex: "members",
      width: 200,
      render: (member) => <Avatar membersData={member} heading={"Members"} />,
    },
    {
      title: rewardDictionary.approvers,
      dataIndex: "approvers",
      width: 200,
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
    },
  ];
};
