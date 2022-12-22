import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import AvatarCustom from "../../../sharedComponents/Avatar/avatarOLD";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (CareerDictionaryList) => {
  return [
    {
      title: CareerDictionaryList.labels.department,
      dataIndex: "department",
      ellipsis: true,
      sort: true,
      width: 160,
    },
    {
      title: CareerDictionaryList.labels.description,
      dataIndex: "description",
      ellipsis: true,
      sort: true,
      width: 160,
    },
    {
      title: CareerDictionaryList.labels.creator,
      dataIndex: "creator",
      ellipsis: true,
      width: 160,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: CareerDictionaryList.labels.minSalary,
      dataIndex: "minSalary",
      ellipsis: true,
      sort: true,
      width: 100,
    },
    {
      title: CareerDictionaryList.labels.maxSalary,
      dataIndex: "maxSalary",
      ellipsis: true,
      sort: true,
      width: 100,
    },
    {
      title: CareerDictionaryList.labels.endDate,
      dataIndex: "endDate",
      render: (endDate) => moment(endDate).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
      width: 100,
    },

    {
      title: CareerDictionaryList.labels.date,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
      width: 100,
    },
    {
      title: CareerDictionaryList.labels.approvers,
      dataIndex: "approvers",
      ellipsis: true,
      width: 100,

      render: (approvers) => (
        <Avatar
          membersData={approvers ? approvers : []}
          heading={"Approvers"}
        />
      ),
    },
  ];
};
