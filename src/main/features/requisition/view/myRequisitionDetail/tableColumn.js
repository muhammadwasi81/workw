import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import { requisitionDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { useContext } from "react";

export const tableColumn = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
	const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
  return [
    {
      title: requisitionDictionary.name,
      dataIndex: "name",
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.PhoneNumber,
      dataIndex: "phoneNumber",
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.Email,
      dataIndex: "email",
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.Offer,
      dataIndex: "offer",
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.BusinessName,
      dataIndex: "businessName",
      ellipsis: true,
      sort: true,
    },
    {
        title: requisitionDictionary.BusinessAddress,
        dataIndex: "businessAddress",
        ellipsis: true,
        sort: true,
      },
    {
      title: requisitionDictionary.Status,
      dataIndex: "status",
      ellipsis: true,
      render: (status) => <StatusTag status={status} />,
    },
  ];
};
