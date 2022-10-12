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
      title: "Header",
      dataIndex: "header",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      ellipsis: true,
      sort: true,
    },

    {
      title: "Expense Date",
      dataIndex: "expenseDate",
      ellipsis: true,
      sort: true,
      render: (date) => moment(date).format("ddd,MMM DD,YYYY"),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    // {
    //   title: "Task Assigned To",
    //   dataIndex: "members",
    //   ellipsis: true,
    //   render: (member) => <Avatar membersData={member} heading={"Members"} />,
    // },
  ];
};
