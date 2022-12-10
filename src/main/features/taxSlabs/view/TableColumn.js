export const tableColumn = () => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      sort: true,
      width: 200,
    },
    { title: "Min", dataIndex: "min", width: 50, sort: true },
    { title: "Max", dataIndex: "max", width: 50, sort: true },
    { title: "Percentage", dataIndex: "max", width: 50, sort: true },
    { title: "Previous Charge", dataIndex: "previousCharge", width: 50, sort: true },
  ];
};
