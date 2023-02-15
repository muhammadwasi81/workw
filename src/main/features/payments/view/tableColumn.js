export const tableColumn = () => {
  //Width will be set Accordingly
  return [
    { title: "Bill No.", dataIndex: "name" },
    {
      title: "Amount",
      dataIndex: "incomingPort",
    },
    {
      title: "Card Last 4",
      dataIndex: "incomingServerAddress",
    },
    {
      title: "Card Holder",
      dataIndex: "outgoingPort",
    },
    {
      title: "Business Name",
      dataIndex: "outgoingServerAddress",
    },
  ];
};
