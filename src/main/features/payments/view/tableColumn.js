export const tableColumn = () => {
  //Width will be set Accordingly
  return [
    { title: "Bill No.", dataIndex: "billingId" },
    {
      title: "Amount",
      dataIndex: "paidAmount",
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
      dataIndex: "businessName",
    },
  ];
};
