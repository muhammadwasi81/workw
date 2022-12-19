import moment from "moment";
import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import Avatar from "../../../sharedComponents/Avatar/avatar";

// import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import AvatarCustom from "../../../sharedComponents/Avatar/avatarOLD";
// import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Bonus",
      dataIndex: "bonus",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Appraised of",
      dataIndex: "user",
      ellipsis: true,
      //   width: 160,
      render: (user) => (
        <TagAvatar
          text={user.name}
          img={
            <AvatarCustom
              width={20}
              height={20}
              src={user.image}
              name={user.name}
              round
            ></AvatarCustom>
          }
        />
      ),
      sort: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => moment(endDate).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
      //   width: 100,
    },

    {
      title: "Created Date",
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
      //   width: 100,
    },
    {
      title: "Approvers",
      dataIndex: "approvers",
      ellipsis: true,
      //   width: 100,

      render: (approvers) => (
        <Avatar
          membersData={approvers ? approvers : []}
          heading={"Approvers"}
        />
      ),
    },
  ];
};
