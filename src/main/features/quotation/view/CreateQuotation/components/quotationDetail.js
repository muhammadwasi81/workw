import React from "react";
import moment from "moment";
import { Divider, Table } from "antd";

const QuotationDetail = ({ details }) => {
  console.log(details);
  const columns = [
    {
      title: "Description",
      dataIndex: "item",
      key: "item/service",
    },
    {
      title: "Rate",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const data = [
    {
      item: "Laptop",
      price: 32000,
      quantity: 2,
      amount: 64000,
    },
    {
      item: "Bike",
      price: 32000,
      quantity: 1,
      amount: 32000,
    },
    {
      item: "Car",
      price: 50000,
      quantity: 2,
      amount: 100000,
    },
  ];
  return (
    <>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col">
          <div className="text-xl font-extrabold">Lenovo</div>
          <span className="text-sm">
            {"Bussiness Number (021) 456 789 321"}
          </span>
          <span className="text-sm">
            {"Shahrah-e-Faisal Rd, Block 6 PECHS"}
          </span>
          <span className="text-sm">Karachi</span>
          <span className="text-sm">72500</span>
          <span className="text-sm">034523425</span>
          <span className="text-sm">Karachi</span>
          <span className="text-sm">shah@gmail.com</span>
        </div>
        <div className="flex flex-col text-end justify-evenly">
          <div className="font-bold text-sm">CODE</div>
          <span className="text-sm">ITM-00006</span>
          <div className="font-bold text-sm">DATE</div>
          <span className="text-sm">{moment().format("DD/MM/YYYY")}</span>
          <div className="font-bold text-sm">TOTAL</div>
          <span className="text-sm">PKR Rs 14,144,08</span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col">
        <span>To</span>
        <div className="text-xl font-extrabold">HUMAYOUN SHAH</div>
        <span className="text-sm">F23 Defence View Housing Society</span>
        <span className="text-sm">Karachi</span>
        <span className="text-sm">76784</span>
        <span className="text-sm">0392174812</span>
        <span className="text-sm">humayoun@gmail.com</span>
      </div>
      <div className="mt-6">
        {/* <Table dataSource={data} columns={columns} /> */}
        <table className="w-full text-center">
          <tr
            style={{ backgroundColor: "#526bb1", color: "#fff" }}
            // className="decoration-white"
          >
            <th>Description</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
          {/**
     //Map data of row wise from data     
  */}
          <tr
            className="text-center text-sm"
            style={{ borderBottom: "0.5px solid rgb(207 199 199 / 85%)" }}
          >
            <td>Bike</td>
            <td>32000</td>
            <td>2</td>
            <td>64000</td>
          </tr>
          {/* <br /> */}
          <tr
            className="text-center text-sm"
            style={{ borderBottom: "0.5px solid rgb(207 199 199 / 85%)" }}
          >
            <td>Laptop</td>
            <td>32000</td>
            <td>2</td>
            <td>64000</td>
          </tr>
          {/* <br /> */}
        </table>
      </div>
      <div className="mt-4 text-end flex ">
        <div className="flex-1"></div>
        <div className="flex-1">
          <div className="flex justify-between" style={{ height: "2rem" }}>
            <span className="font-bold">SubTotal</span>
            <span>Rs 911,923.00</span>
          </div>
          <div
            className="flex justify-between"
            style={{
              borderBottom: "0.5px solid rgb(207 199 199 / 85%)",
              height: "2rem",
            }}
          >
            <span className="font-bold">{"Tax(0%)"}</span>
            <span>Rs 0.00</span>
          </div>
          <div
            className="flex justify-between"
            style={{
              borderBottom: "0.5px solid rgb(207 199 199 / 85%)",
              marginTop: "1rem",
              height: "2rem",
            }}
          >
            <span className="font-bold">Total</span>
            <span>Rs 911,923.00</span>
          </div>
        </div>
        {/* <div>
          <span>SubTotal</span>
          <span>Rs 911,923.00</span>
        </div>
        <div>
          <span>{"Tax(0%)"}</span>
          <span>Rs 0.00</span>
        </div>
        <div>
          <span>Total</span>
          <span>Rs 911,923.00</span>
        </div> */}
      </div>
    </>
  );
};

export default QuotationDetail;
