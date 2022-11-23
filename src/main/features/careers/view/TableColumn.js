import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import AvatarCustom from "../../../sharedComponents/Avatar/avatarOLD";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    {
      title: "Department",
      dataIndex: "department",
      ellipsis: true,
      sort: true,
      width: 160,
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      sort: true,
      width: 160,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      ellipsis: true,
      width: 160,
      render: (creator) => (
        <TagAvatar
          text={creator.name}
          img={
            <AvatarCustom
              width={20}
              height={20}
              src={creator.image}
              name={creator.name}
              round
            ></AvatarCustom>
          }
        />
      ),
      sort: true,
    },
    {
      title: "Min Salary",
      dataIndex: "minSalary",
      ellipsis: true,
      sort: true,
      width: 100,
    },
    {
      title: "Max Salary",
      dataIndex: "maxSalary",
      ellipsis: true,
      sort: true,
      width: 100,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => moment(endDate).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
      width: 100,
    },

    {
      title: "Date",
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
      width: 100,
    },
    {
      title: "Approvers",
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
