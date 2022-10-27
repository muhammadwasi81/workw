import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
export const quotationTableColumn = () => {
  return [
    {
      title: "Client's Name",
      dataIndex: "name",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Client's Email",
      dataIndex: "email",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: "Approvers",
      dataIndex: "approvers",
      ellipsis: true,
      render: (value) => (
        <Avatar
          isAvatarGroup={true}
          heading={"approvers"}
          membersData={value ? value : []}
        />
      ),
      sort: true,
    },
    {
      title: "QuotationDate",
      dataIndex: "quotationDate",
      render: (i) => moment(i.quotationDate).format("DD MMM YYYY"),
      sort: true,
    },
  ];
};
