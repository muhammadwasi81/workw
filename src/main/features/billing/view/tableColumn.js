export const tableColumn = () => {
  //Width will be set Accordingly
  return [
    { title: "Bill No.", dataIndex: "name" },
    {
      title: "Month",
      dataIndex: "incomingPort",
    },
    {
      title: "Users",
      dataIndex: "incomingServerAddress",
    },
    {
      title: "Amount",
      dataIndex: "outgoingPort",
    },
    {
      title: "Description",
      dataIndex: "outgoingServerAddress",
    },
    {
      title: "Status",
      dataIndex: "outgoingServerAddress",
    },
    {
      title: "Transaction",
      dataIndex: "outgoingServerAddress",
    },
    {
      title: "Reference",
      dataIndex: "outgoingServerAddress",
    },
    {
      title: "Bussiness Name",
      dataIndex: "outgoingServerAddress",
    },
  ];
};
export const pendingBillsColumns = () => {
  //Width will be set Accordingly
  return [
    { title: "Bill No.", 
    // dataIndex: "name" 
    },
    {
      title: "Month",
      // dataIndex: "incomingPort",
    },
    {
      title: "Year",
      // dataIndex: "incomingServerAddress",
    },
    {
      title: "Total",
      // dataIndex: "outgoingPort",
    },
    {
      title: "Users",
      // dataIndex: "outgoingServerAddress",
    } 
 ];
};

