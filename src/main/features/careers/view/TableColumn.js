import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    {
      title: "Department",
      dataIndex: "department",
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
      title: "Creator",
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: "Min Salary",
      dataIndex: "minSalary",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Max Salary",
      dataIndex: "maxSalary",
      ellipsis: true,
      sort: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => moment(endDate).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
    },

    {
      title: "Date",
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
    },
    {
      title: "Approvers",
      dataIndex: "approvers",
      ellipsis: true,
      render: (approvers) => (
        <Avatar
          membersData={approvers ? approvers : []}
          heading={"Approvers"}
        />
      ),
    },
  ];
};
