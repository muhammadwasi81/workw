import moment from "moment";
import Avatar from "../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../sharedComponents/Tag/StatusTag";
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
      ellipsis: true,
      sort: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      ellipsis: true,
      render: (/* creator */) => (
        <TagAvatar
          text={/* creator.name */ "Daniyal"}
          img={/* creator.image */ "Avatar"}
        />
      ),
      sort: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (/* status */) => (
        <StatusTag status={/* status */ "In Progress"} />
      ),
      sort: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      ellipsis: true,
      sort: true,
    },
    // { title: "Name", dataIndex: "name", ellipsis: true, sort: true },
    // { title: "Reason", dataIndex: "reason", ellipsis: true, sort: true },
    {
      title: "Date",
      dataIndex: "createDate",
      render: (/* i */) => moment(/* i.createDate */).format("DD MMM YYYY"),
      sort: true,
    },

    {
      title: "Complain Of",
      dataIndex: "members",
      ellipsis: true,
      render: (/* member */) => (
        <Avatar membersData={/* member */ "Daniyal"} heading={"Members"} />
      ),
    },
    {
      title: "Approvers",
      dataIndex: "approvers",
      ellipsis: true,
      render: (/* approver */) => (
        <Avatar membersData={/* approver */ "No Name"} heading={"Approvers"} />
      ),
    },
  ];
};
