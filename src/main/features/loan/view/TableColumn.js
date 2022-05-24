export const tableColumn = () => {
  return [
    { 
      title: "Creator",
      dataIndex: "creator",
      width: "20%",
      key: 1,
      render: (i) => i.name
    },
    { title: "Category", dataIndex: "category", width: "20%", key: 2 },
    { title: "Name", dataIndex: "name", width: "20%", key: 3 },
    // { 
    //   title: "Ref No",
    //   dataIndex: "approvers",
    //   width: "20%",
    //   key: 4,
    //   render: (e) => e.map((i) => i.referenceId)
    // },
    { title: "Reward To", dataIndex: "name", width: "20%", key: 3 },
  ];
}