import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";

const ReportReport = () => {
  return (
    <div className="reportFilter">
      <Select
        showSearch
        optionFilterProp="children"
        onChange={() => {}}
        style={{ width: "200px", margin: "5px" }}
        placeholder="Voucher Type"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {[
          { label: "Payment Voucher", value: 1 },
          { label: "Receipt Voucher", value: 2 },
          { label: "Other Voucher", value: 3 },
        ].map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>

      <Select
        showSearch
        optionFilterProp="children"
        onChange={() => {}}
        style={{ width: "200px", margin: "5px" }}
        placeholder="Voucher Type"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {[
          { label: "Payment Voucher", value: 1 },
          { label: "Receipt Voucher", value: 2 },
          { label: "Other Voucher", value: 3 },
        ].map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>

      <Select
        showSearch
        optionFilterProp="children"
        onChange={() => {}}
        style={{ width: "200px", margin: "5px" }}
        placeholder="Voucher Type"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {[
          { label: "Payment Voucher", value: 1 },
          { label: "Receipt Voucher", value: 2 },
          { label: "Other Voucher", value: 3 },
        ].map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>

      <Select
        showSearch
        optionFilterProp="children"
        onChange={() => {}}
        style={{ width: "200px", margin: "5px" }}
        placeholder="Voucher Type"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {[
          { label: "Payment Voucher", value: 1 },
          { label: "Receipt Voucher", value: 2 },
          { label: "Other Voucher", value: 3 },
        ].map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>

      <Select
        showSearch
        optionFilterProp="children"
        onChange={() => {}}
        style={{ width: "200px", margin: "5px" }}
        placeholder="Voucher Type"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {[
          { label: "Payment Voucher", value: 1 },
          { label: "Receipt Voucher", value: 2 },
          { label: "Other Voucher", value: 3 },
        ].map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>

      <Select
        showSearch
        optionFilterProp="children"
        onChange={() => {}}
        style={{ width: "200px", margin: "5px" }}
        placeholder="Voucher Type"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {[
          { label: "Payment Voucher", value: 1 },
          { label: "Receipt Voucher", value: 2 },
          { label: "Other Voucher", value: 3 },
        ].map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>

      <Select
        showSearch
        optionFilterProp="children"
        onChange={() => {}}
        style={{ width: "200px", margin: "5px" }}
        placeholder="Voucher Type"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {[
          { label: "Payment Voucher", value: 1 },
          { label: "Receipt Voucher", value: 2 },
          { label: "Other Voucher", value: 3 },
        ].map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>
    </div>
  );
};
export default ReportReport;
