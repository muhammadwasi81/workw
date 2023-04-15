import { useState } from "react";
import { Modal, Table, Button } from "antd";
import { prop } from "dom7";

function AllowanceDetailTable(props) {
  const dataSource = [
    {
      key: "1",
      allocatedLeaves: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
      age: <input placeholder="Enter Leave allot" className="bg-transparent" />,
      address: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
    },
    {
      key: "1",
      allocatedLeaves: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
      age: <input placeholder="Enter Leave allot" className="bg-transparent" />,
      address: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
    },
    {
      key: "1",
      allocatedLeaves: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
      age: <input placeholder="Enter Leave allot" className="bg-transparent" />,
      address: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
    },
    {
      key: "1",
      allocatedLeaves: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
      age: <input placeholder="Enter Leave allot" className="bg-transparent" />,
      address: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
    },
    {
      key: "1",
      allocatedLeaves: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
      age: <input placeholder="Enter Leave allot" className="bg-transparent" />,
      address: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
    },
    {
      key: "1",
      allocatedLeaves: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
      age: <input placeholder="Enter Leave allot" className="bg-transparent" />,
      address: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
    },
    {
      key: "1",
      allocatedLeaves: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
      age: <input placeholder="Enter Leave allot" className="bg-transparent" />,
      address: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
    },
    {
      key: "1",
      allocatedLeaves: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
      age: <input placeholder="Enter Leave allot" className="bg-transparent" />,
      address: (
        <input placeholder="Enter Leave allot" className="bg-transparent" />
      ),
    },
  ];

  const columns = [
    {
      title: "allocatedLeaves",
      dataIndex: "allocatedLeaves",
      key: "allocatedLeaves",
      width: "33%",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "33%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "33%",
    },
  ];
  console.log(props.visible, "hkbcaskhb");
  return (
    <Modal
      title="Table Popup Component"
      visible={props.visible}
      onCancel={props.onClose}
      width={600}
      destroyOnClose={true}
    >
      <Table scroll={{ y: 246 }} columns={columns} dataSource={dataSource} />
    </Modal>
  );
}

// function allowance() {
//   const [visible, setVisible] = useState(false);

//   function handleOpenClick() {
//     setVisible(true);
//   }

//   function handleCloseClick() {
//     setVisible(false);
//   }

//   return (
//     <div>
//       <Button onClick={handleOpenClick}>Open Table Popup</Button>
//       <MyTableModal visible={visible} onClose={handleCloseClick} />
//     </div>
//   );

export default AllowanceDetailTable;
