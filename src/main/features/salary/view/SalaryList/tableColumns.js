import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
export const salaryTableColumn = (salaryDictionary) => {
  return [
    {
      title: salaryDictionary.referenceno,
      dataIndex: "referenceNo",
      ellipsis: true,
      sort: true,
    },
    {
      title: salaryDictionary.creator,
      dataIndex: "creator",
      ellipsis: true,
      render: (creator) => (
        <TagAvatar text={creator.name} img={creator.image} />
      ),
      sort: true,
    },
    {
      title: salaryDictionary.Approvers,
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
      title: salaryDictionary.BasicSalary,
      dataIndex: "basicSalary",
      ellipsis: true,
      sort: true,
    },
    {
      title: salaryDictionary.NetSalary,
      dataIndex: "netSalary",
      ellipsis: true,
      sort: true,
    },
    {
      title: salaryDictionary.status,
      dataIndex: "status",
      render: (status) => <StatusTag status={status} />,
      sort: true,
    },
  ];
};
