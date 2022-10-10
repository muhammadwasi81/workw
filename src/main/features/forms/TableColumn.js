import moment from "moment";

import Avatar from "../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Title",
      dataIndex: "subject",
    },
    {
      title: "Description",
      dataIndex: "description",
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
