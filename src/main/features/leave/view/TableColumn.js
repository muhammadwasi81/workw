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
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      width: 200,
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
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate) => moment(startDate).format("ddd,DD MMM YYYY"),
      sort: true,
      width: 200,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => moment(endDate).format("ddd,DD MMM YYYY"),
      sort: true,
      width: 200,
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
