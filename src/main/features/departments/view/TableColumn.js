import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    { title: "Dept Name", dataIndex: "name", ellipsis: true, sort: true },
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      sort: true,
    },
    // {
    //   title: "Creator",
    //   dataIndex: "members",
    //   ellipsis: true,
    //   render: (creator) => (
    //     <TagAvatar text={creator.name} img={creator.image} />
    //   ),
    //   sort: true,
    // },
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
  ];
};
