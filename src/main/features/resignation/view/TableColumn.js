import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
export const tableColumn = (resignationDictionary) => {
  return [
    // {
    //   title: "Sort",
    //   dataIndex: "sort",
    //   drag: true,
    //   width: 80,
    // },
    {
      title: resignationDictionary.referenceNo,
      dataIndex: "referenceNo",
      ellipsis: true,
      sort: true,
    },
    {
      title: resignationDictionary.creator,
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: resignationDictionary.status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
    {
      title: resignationDictionary.date,
      dataIndex: "createDate",
      render: (i) => moment(i.createDate).format("DD MMM YYYY"),
      sort: true,
    },

    // {
    //   title: "Approvers",
    //   dataIndex: "approvers",
    //   ellipsis: true,
    //   render: (approver) => <Avatar membersData={approver} heading={"Approvers"} />,
    // },
  ];
};
