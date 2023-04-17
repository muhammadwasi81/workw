import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";

export const AwardsDataTable = [
  {
    title: "Reference No.",
    dataIndex: "referenceNo",
    key: "referenceNo",
    sort: true,
    ellipsis: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sort: true,
    ellipsis: true,
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    sort: true,
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <StatusTag status={status} />,
    sort: true,
    ellipsis: true,
  },
  {
    title: "Creator",
    dataIndex: "creator",
    width: 200,
    render: (creator) => <TagAvatar text={creator.name} img={creator.image} />,
    sort: true,
  },
];
