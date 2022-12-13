import moment from "moment";

import Avatar from "../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../sharedComponents/Tag/StatusTag";
export const tableColumn = (documentDictionary) => {
  const {
    referenceNo,
    creator,
    status,
    date,
    title,
    Description,
    Approvers,
  } = documentDictionary;

  return [
    {
      title: referenceNo,
      dataIndex: "referenceNo",
      ellipsis: true,
      sort: true,
    },
    {
      title: title,
      dataIndex: "subject",
    },
    {
      title: Description,
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: creator,
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    {
      title: date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
    },
    {
      title: Approvers,
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
