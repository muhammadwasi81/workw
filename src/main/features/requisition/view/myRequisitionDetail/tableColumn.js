import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import { requisitionDictionaryList } from "../../localization/index";

export const tableColumn = (userLanguage) => {
  const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
  return [
    {
      title: requisitionDictionary.name,
      dataIndex: "name",
      sort: true,
      width: 200,
    },
    {
      title: requisitionDictionary.PhoneNumber,
      dataIndex: "phoneNumber",
      width: 200,
      sort: true,
    },
    {
      title: requisitionDictionary.Email,
      dataIndex: "email",
      sort: true,
      width: 200,
    },
    {
      title: requisitionDictionary.Offer,
      dataIndex: "offer",
      sort: true,
      width: 200,
    },
    {
      title: requisitionDictionary.BusinessName,
      dataIndex: "businessName",
      sort: true,
      width: 200,
    },
    {
      title: requisitionDictionary.BusinessAddress,
      dataIndex: "businessAddress",
      sort: true,
      width: 200,
    },
    {
      title: requisitionDictionary.Status,
      dataIndex: "status",
      width: 100,
      render: (status) => <StatusTag status={status} />,
    },
  ];
};
