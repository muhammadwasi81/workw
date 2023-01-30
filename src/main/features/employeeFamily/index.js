import { Button, DatePicker, Divider, Form, Input, Select, Table } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { EditOutlined } from "@ant-design/icons";
import { getAllRebateCategoriesService } from "../rebateCategory/services/service";
import moment from "moment";
import { useDispatch } from "react-redux";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { addEmployeeFamily } from "../employee/store/actions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createGuid, STRINGS } from "../../../utils/base";
import { EmployeeFamilyRelationEnum } from "./enum";
import FileUploader from "../Messenger/view/MessengerBox/components/fileUploader";

function EmployeeFamily({ mode }) {
  const isEdit = mode === "edit";
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const param = useParams();

  //   const columns = (data) => {
  //     return [
  //       {
  //         title: "Amount",
  //         dataIndex: "amount",
  //         ellipsis: true,
  //         key: "amount",
  //       },
  //       {
  //         title: "Category",
  //         dataIndex: "category",
  //         ellipsis: true,
  //         key: "category",
  //         // render: (value, _, index) => {
  //         //   // return employeeRebate.filter((item) => item.id === value)[index].name;
  //         // },
  //       },
  //       {
  //         title: "Date",
  //         dataIndex: "date",
  //         ellipsis: true,
  //         key: "date",
  //         render: (value) => {
  //           return moment(value).format("DD/MM/YYYY");
  //         },
  //       },
  //       {
  //         title: sharedLabels.action,
  //         render: (value, __, rowIndex) => {
  //           return (
  //             <a
  //               href=" "
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 e.stopPropagation();
  //                 if (isEdit) {
  //                   //   setDisableAdd(true);
  //                   //   handleRowChange(rowIndex);
  //                   setRebateId(data[rowIndex].id);
  //                 } else {
  //                   const filterArray = data.filter((value, i) => {
  //                     if (rowIndex !== i) return value;
  //                   });
  //                   //   setRebateEmployee(filterArray);
  //                 }
  //               }}
  //             >
  //               {isEdit ? sharedLabels.Edit : sharedLabels.Delete}
  //             </a>
  //           );
  //         },
  //       },
  //     ];
  //   };

  const imageUpload = (att) => {
    console.log(att);
    // setRebateImag(att);
  };

  return (
    <div className="employeeForm">
      <Divider orientation="left">Family Info</Divider>
      <Form name="rebateInfo" layout={"vertical"} form={form}>
        <Form.Item
          name="firstName"
          label={"First Name"}
          rules={[{ required: true }]}
        >
          <Input placeholder="First Name" type="text" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label={"Last Name"}
          rules={[{ required: true }]}
        >
          <Input placeholder="Last Name" type="text" />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label={"Date of Birth"}
          rules={[{ required: true }]}
        >
          <DatePicker
            getPopupContainer={(trigger) => trigger.parentNode}
            format={"DD/MM/YYYY"}
            placeholder="Select Date"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="contactNo"
          label={"Contact No."}
          rules={[{ required: true }]}
        >
          <Input placeholder="Contact No." type="number" />
        </Form.Item>
        <Form.Item name="email" label={"Email"} rules={[{ required: true }]}>
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item
          label={"Relation"}
          name="relationId"
          rules={[
            {
              required: true,
              message: "Please Enter Relation",
            },
          ]}
        >
          <Select placeholder={"Relation"} size="large">
            {EmployeeFamilyRelationEnum.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item area="true" label="Attachments">
          <FileUploader
            url={""}
            value={""}
            // fileList={rebateImage ? rebateImage : []}
            uploadButton={<div>Upload</div>}
            handleUpload={(att) => imageUpload(att)}
            isMultiple={false}
            classes=""
          />
        </Form.Item>
      </Form>
      <div className={isEdit ? "editButtons " : "buttons"}>
        <Button
          type="dashed"
          style={{ marginLeft: "auto" }}
          icon={<EditOutlined />}
          //   onClick={handleSubmit}
          //   disabled={disableAdd ? true : false}
        >
          Add Family
        </Button>
        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            // onClick={handleUpdate}
            // disabled={!disableAdd ? true : false}
          >
            Update Family
          </Button>
        )}
      </div>
      {/* {employeeRebate.length > 0 && (
        <div className="rebateTable" style={{ marginTop: "1rem" }}>
          <Table
            columns={columns(employeeRebate)}
            dragable={true}
            dataSource={rebateEmployee}
          />
        </div>
      )} */}
    </div>
  );
}

export default EmployeeFamily;
