import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
// import { addBilling } from "../store/actions";

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
export const pendingBillsColumns = (handleClick , addBilingHandler) => {
  //Width will be set Accordingly
  return [
    // { title: "Bill No.", 
    // dataIndex: "BillNo" 
    // },
    {
      title: "Month",
      dataIndex: "billMonth",
    },
    {
      title: "Year",
      dataIndex: "billYear",
    },
    {
      title: "Users",
      dataIndex: "users",
      render: (text, record) => <a onClick={() => handleClick(record.billingUsers)} className="cursor-poiner">{text}</a>
    },
    {
      render: (text, record) => (
        <div>
          <Button
            className="ThemeBtn"
            // style={{ color: "blue", marginRight: 8 }}
            onClick={() => addBilingHandler(record)}
          >
            Send Bill
          </Button>
        </div>
      ),
    }
 ];
};

export const BillingUserColumn = () => {
  //Width will be set Accordingly
  return [
    // { title: "Bill No.", 
    // dataIndex: "BillNo" 
    // },
    {
      title: "Cost",
      dataIndex: "cost",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
 ];
};

