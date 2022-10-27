<<<<<<< HEAD
import StatusTag from '../../../../sharedComponents/Tag/StatusTag';
import { requisitionDictionaryList } from '../../localization/index';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { useContext } from 'react';

export const tableColumn = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userLanguage } = useContext(LanguageChangeContext);
  const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
  return [
    {
      title: requisitionDictionary.name,
      dataIndex: 'name',
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.PhoneNumber,
      dataIndex: 'phoneNumber',
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.Email,
      dataIndex: 'email',
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.Offer,
      dataIndex: 'offer',
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.BusinessName,
      dataIndex: 'businessName',
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.BusinessAddress,
      dataIndex: 'businessAddress',
      ellipsis: true,
      sort: true,
    },
    {
      title: requisitionDictionary.Status,
      dataIndex: 'status',
      ellipsis: true,
      render: (status) => <StatusTag status={status} />,
    },
  ];
=======
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import { requisitionDictionaryList } from "../../localization/index";

export const tableColumn = userLanguage => {
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
			render: status => <StatusTag status={status} />,
		},
	];
>>>>>>> 5025d3abfff23bd2dc4573158e05e33d856aaf3e
};
