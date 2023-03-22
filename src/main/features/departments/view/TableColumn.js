import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (departmentDictionary) => {
  return [
    {
      title: departmentDictionary.deptName,
      dataIndex: "name",
      ellipsis: true,
      sort: true,
    },
    // {
    //   title: "Reference No",
    //   dataIndex: "referenceNo",
    //   ellipsis: true,
    //   sort: true,
    // },
    {
      title: departmentDictionary.description,
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
      title: departmentDictionary.status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      ellipsis: true,
      sort: true,
    },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   ellipsis: true,
    //   sort: true,
    // },
  ];
};
