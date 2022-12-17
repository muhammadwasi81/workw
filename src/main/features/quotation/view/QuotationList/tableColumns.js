import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
export const quotationTableColumn = (quotationDictionary) => {
  return [
    {
      title: quotationDictionary.quotationDate,
      dataIndex: "quotationDate",
      render: (quotationDate) => moment(quotationDate).format("DD MMM YYYY"),
      sort: true,
    },
    {
      title: quotationDictionary.clientsName,
      dataIndex: "name",
      ellipsis: true,
      sort: true,
    },
    {
      title: quotationDictionary.clientsEmail,
      dataIndex: "email",
      ellipsis: true,
      sort: true,
    },
    {
      title: quotationDictionary.phoneNumber,
      dataIndex: "phoneNumber",
      ellipsis: true,
      sort: true,
    },
    // {
    //   title: quotationDictionary.creator,
    //   dataIndex: "creator",
    //   ellipsis: true,
    //   render: (creator) => (
    //     <TagAvatar text={creator.name} img={creator.image} />
    //   ),
    //   sort: true,
    // },
    {
      title: quotationDictionary.totalAmount,
      dataIndex: "details",
      ellipsis: true,
      render: (details) => (
        <div>
          {details.reduce((a, b) => a + (b.price * b.quantity), 0)}
        </div>
      ),
      sort: true,
    },
    {
      title: quotationDictionary.approvers,
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
    }
  ];
};
