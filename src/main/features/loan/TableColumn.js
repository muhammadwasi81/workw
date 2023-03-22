import moment from "moment";
import Avatar from "../../sharedComponents/Avatar/avatar";
import AvatarCustom from "../../sharedComponents/Avatar/avatarOLD";
import TagAvatar from "../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../sharedComponents/Tag/StatusTag";
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
      width: 160,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Deduction Per Month",
      dataIndex: "deductionPerMonth",
      ellipsis: true,
      sort: true,
    },
    {
      title: "DeadLine",
      dataIndex: "deadline",
      render: (deadline) => moment(deadline).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
    },

    {
      title: "Date",
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
    },
    {
      title: "Approvers",
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
