import { Tag } from "antd";
import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";
// import Avatar from "../../../../../../../sharedComponents/Avatar/avatar";

// import TagAvatar from "../../../../../sharedComponents/Avatar/TagAvatar";
// import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
export const sectionTableColumn = (WorkBoardDictionaryList) => {
  return [
    {
      title: WorkBoardDictionaryList.labels.section,
      dataIndex: "workBoardSection",
      ellipsis: true,
      sort: true,
    },
    {
      title: WorkBoardDictionaryList.labels.title,
      dataIndex: "title",
      ellipsis: true,
      sort: true,
    },
    {
      title: WorkBoardDictionaryList.labels.description,
      dataIndex: "description",
      ellipsis: true,
      sort: true,
    },

    {
      title: WorkBoardDictionaryList.labels.labels,
      dataIndex: "labels",
      ellipsis: true,
      render: (labels) =>
        labels.map((label) => <Tag color={label.colorCode} className="!h-5" />),
    },
    {
      title: WorkBoardDictionaryList.labels.createdDate,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
    },
  ];
};
