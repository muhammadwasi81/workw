import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React, { useState } from "react";
import { getMonthName } from "../enum";



export const tableColumn = () => {
  //Width will be set Accordingly
  return [
    { title: "Bill No.", dataIndex: "billNumber" },
    {
      title: "Month - Year",
      dataIndex: "billMonth",
      render: (monthNumber , record) =>  {
        const monthName = getMonthName(monthNumber);
        return `${monthName} - ${record?.billYear} `;
      }
    },
    {
      title: "Users",
      dataIndex: "users",
    },
    {
      title: "Amount",
      dataIndex: "total",
      render: (amount) => `$${amount}`
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
      dataIndex: "businessName",
    },
  ];
};
export const pendingBillsColumns = (handleClick , addBilingHandler ,isModalVisible ,selectedRecord  ,setIsModalVisible ,setSelectedRecord) => {
  
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
      title: "Total",
      dataIndex: "total",
    },
    ,
    {
      render: (text, record) => (
        <div>
          <Button className="ThemeBtn" onClick={() => {setSelectedRecord(record);setIsModalVisible(true)}}>
            Send Bill
          </Button>
          {selectedRecord === record && (
            <Popconfirm
              title="Are you sure you want to send the bill?"
              visible={isModalVisible}
              onConfirm={() => {
                addBilingHandler(selectedRecord);
                setIsModalVisible(false);
                setSelectedRecord(null);
              }}
              onCancel={() => {
                setIsModalVisible(false);
                setSelectedRecord(null);
              }}
              okText="Yes"
              cancelText="No"
            />
          )}
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

