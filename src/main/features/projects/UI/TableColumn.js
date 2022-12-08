import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (projectsDictionary) => {
  return [
    {
      title: projectsDictionary.labels.referenceNo,
      dataIndex: "referenceNo",
      ellipsis: true,
      sort: true,
    },
    {
      title: projectsDictionary.labels.creator,
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: projectsDictionary.labels.status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    {
      title: projectsDictionary.labels.category,
      dataIndex: "category",
      ellipsis: true,
      sort: true,
    },
    {
      title: projectsDictionary.labels.name,
      dataIndex: "name",
      ellipsis: true,
      sort: true,
    },
    {
      title: projectsDictionary.labels.reason,
      dataIndex: "reason",
      ellipsis: true,
      sort: true,
    },
  ];
};
