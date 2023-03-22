import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

export const tableColumn = () => {
  return [
    // {
    //   title: "Sort",
    //   dataIndex: "sort",
    //   drag: true,
    //   width: 80,
    // },
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      width: 100,
      sort: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      width: 200,
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
      width: 100,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      sort: true,
      width: 200,
    },

    {
      title: "Date",
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      sort: true,
      width: 200,
    },
    {
      title: "Amount",
      dataIndex: "value",

      sort: true,
      width: 100,
    },
    {
      title: "Approvers",
      dataIndex: "approvers",
      render: (approver) => (
        <Avatar membersData={approver} heading={"Approvers"} />
      ),
      width: 200,
    },
  ];
};
