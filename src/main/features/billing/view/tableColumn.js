import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
// import { addBilling } from "../store/actions";
const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthNumber - 1];
};

export const tableColumn = () => {
  //Width will be set Accordingly
  return [
    { title: "Bill No.", dataIndex: "billNumber" },
    {
      title: "Month",
      dataIndex: "billMonth",
      render: (monthNumber) => getMonthName(monthNumber)
    },
    {
      title: "Users",
      dataIndex: "users",
    },
    {
      title: "Amount",
      dataIndex: "total",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Bussiness Name",
      dataIndex: "outgoingServerAddress",
    },
  ];
};
export const pendingBillsColumns = (handleClick , addBilingHandler , handelWarning) => {
  //Width will be set Accordingly
  return [
    // { title: "Bill No.", 
    // dataIndex: "BillNo" 
    // },
    {
      title: "Month",
      dataIndex: "billMonth",
      render: (monthNumber) => getMonthName(monthNumber)
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
            onClick={() => handelWarning()}
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

