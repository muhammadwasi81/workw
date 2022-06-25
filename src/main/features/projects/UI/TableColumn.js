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
      title: "Creator",
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => <TagAvatar text={creator.name} img={creator.image} />,
      sort: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      ellipsis: true,
      sort: true,
    },
    { title: "Name", dataIndex: "name", ellipsis: true, sort: true },
    { title: "Reason", dataIndex: "reason", ellipsis: true, sort: true },
  ];
};
