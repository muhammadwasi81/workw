import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Checkbox,
  Radio,
} from "antd";
import { useSelector } from "react-redux";
// import moment from "moment";

const constant = [
  {
    name: "allowanceType",
    data: [
      { name: "Benefit", value: 1 },
      { name: "Deduction", value: 2 },
    ],
  },

  {
    name: "allowanceUnit",
    data: [
      { name: "Percent", value: 1 },
      { name: "Amount", value: 2 },
    ],
  },

  {
    name: "isTaxable",
    data: [
      { name: "Taxable", value: false },
      { name: "Non-Taxable", value: true },
    ],
  },
];

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const EditableCell = (props) => {
  const {designation} = useSelector(state => state.adminSlice)
  //   dateFormat = "DD.MM.YYYY";
  //   timeFormat = "HH:mm";
  const getInput = (record, dataIndex, title) => {
    const index = constant.findIndex((item) => {
      return item.name === dataIndex;
    });

    switch (props.inputType) {
      case "numberAllotLeaves":
        return (
          <FormItem
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
            initialValue={record[dataIndex]}
          >
            <InputNumber
              min={0}
              max={50}
              formatter={(value) => value}
              parser={(value) => value}
            />
          </FormItem>
        );
      case "numberValue":
        return (
          <FormItem
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
            initialValue={record[dataIndex]}
          >
            <InputNumber
              min={0}
              max={2147483647}
              formatter={(value) => value}
              parser={(value) => value}
            />
          </FormItem>
        );
      //   case "date":
      //     return (
      //       <FormItem style={{ margin: 0 }}>
      //         {getFieldDecorator(dataIndex, {
      //           initialValue: moment(record[dataIndex], dateFormat)
      //         })(<DatePicker format={dateFormat} />)}
      //       </FormItem>
      //     );
      //   case "time":
      //     return (
      //       <FormItem style={{ margin: 0 }}>
      //         {getFieldDecorator(dataIndex, {
      //           initialValue: moment(record[dataIndex], timeFormat)
      //         })(<TimePicker format={timeFormat} />)}
      //       </FormItem>
      //     );
      case "checkbox":
        return (
          <FormItem
            name={dataIndex}
            style={{ margin: 0 }}
            valuePropName="checked"
          >
            <Checkbox />
          </FormItem>
        );

      case "radio":
        return (
          <FormItem name={dataIndex} style={{ margin: 0 }}>
            <RadioGroup>
              <Radio value={"a"}>a</Radio>
              <Radio value={"b"}>b</Radio>
            </RadioGroup>
          </FormItem>
        );
      case "select":
        return (
          <FormItem name={dataIndex} style={{ margin: 0 }}>
            <Select style={{ width: 150 }} >
              {constant[index].data.map((p, index) => (
                <Option value={p.value} select key={index}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </FormItem>
        );
      case "designationSelect": 
        return (
          <FormItem name={dataIndex} style={{ margin: 0 }} initialValue={record.designationName}>
            <Select style={{ width: 150 }} >
              {designation.map((p, index) => (
                <Option value={p.id} key={index}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </FormItem>
        );

      default:
        return (
          <FormItem
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
            initialValue={record[dataIndex]}
          >
            <Input />
          </FormItem>
        );
    }
  };
  const { editing, dataIndex, title, inputType, record, index, ...restProps } =
    props;

  return (
    <td {...restProps}>
      {editing
        ? 
          getInput(record, dataIndex, title)
        : restProps.children}
    </td>
  );
};

export default EditableCell;

export const checkInput = (index) => {
  switch (index) {
    case "allowanceType":
      return "select";
    case "allowanceUnit":
      return "select";
    case "isTaxable":
      return "select";
    case "defaultAllotLeaves":
      return "numberAllotLeaves";
    case "value":
      return "numberValue";
    case "designationName":
      return "designationSelect";
    default:
      return "text";
  }
};
