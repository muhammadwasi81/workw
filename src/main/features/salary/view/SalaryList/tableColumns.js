import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import React, { useContext} from "react";
import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {salaryDictionary} from "../../../salary/localization/index";


export const salaryTableColumn = () => {

	

	const { userLanguage } = useContext(LanguageChangeContext);
	const { salary_Dictionary } = salaryDictionary[userLanguage];
  
	return [
		{
			title: salary_Dictionary.ReferenceNo,
			dataIndex: "referenceNo",
			ellipsis: true,
			sort: true,
		},
		{
			title: salary_Dictionary.Creator,
			dataIndex:"creator",
			ellipsis: true,
			render: creator =>
				<TagAvatar text={creator?.name} img={creator?.image} />,
			sort: true,
		},
		{
			title: salary_Dictionary.SalaryFor,
			dataIndex:"user",
			ellipsis: true,
			render: creator =>
				<TagAvatar text={creator?.name} img={creator?.image} />,
			sort: true,
		},
		{
			title: salary_Dictionary.Approvers,
			dataIndex:"approvers",
			ellipsis: true,
			render: value => (
				<Avatar
                isAvatarGroup={true}
                heading="approvers"
                membersData={value ? value : []}
              />
			),
			sort: true,
		},
		{
			title: salary_Dictionary.BasicSalary,
			dataIndex:"basic Salary",
			ellipsis: true,
			sort: true,
		},
		{
			title: salary_Dictionary.NetSalary,
			dataIndex:"net Salary",
			ellipsis: true,
			sort: true,
		},
		{
			title:salary_Dictionary.Status,
			dataIndex:"status",
			render: status => <StatusTag status={status} />,
			sort: true,
		}
	];
};
