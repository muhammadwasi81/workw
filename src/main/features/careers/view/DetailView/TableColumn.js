import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import TagAvatar from "../../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
export const tableColumn = () => {
  return [
    {
      title: "FirstName",
      dataIndex: "firstName",
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
      title: "Email",
      dataIndex: "email",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Current Salary",
      dataIndex: "currentSalary",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Expected Salary",
      dataIndex: "expectedSalary",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      ellipsis: true,
      render: (status) => <StatusTag status={status} />,
    },
  ];
};
