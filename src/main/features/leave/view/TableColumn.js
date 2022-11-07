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
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate) => moment(startDate).format("ddd,DD MMM YYYY"),
      sort: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => moment(endDate).format("ddd,DD MMM YYYY"),
      sort: true,
    },

    {
      title: "Approvers",
      dataIndex: "approvers",
      ellipsis: true,
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
    },
  ];
};
