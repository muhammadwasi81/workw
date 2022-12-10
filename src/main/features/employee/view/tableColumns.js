
export const tableColumn = (tables) => {
  return [
    {
      title: tables.Id,
      dataIndex: "id",
      ellipsis: true,
      sort: true,
    },
    {
      title: tables.Name,
      dataIndex: "name",
      ellipsis: true,
      sort: true,
    },
    {
      title: tables.Email,
      dataIndex: "email",
      ellipsis: true,
      sort: true,
    },
    {
      title: tables.Grade,
      dataIndex: "grade",
      ellipsis: true,
      sort: true,
    },

    {
      title: tables.Designation,
      dataIndex: "designation",
      ellipsis: true,
      sort: true,
    },
  ];
};
