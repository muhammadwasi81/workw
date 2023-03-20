import { Button, DatePicker, Divider, Form, Input, Select, Table } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { EditOutlined } from "@ant-design/icons";
import { getAllRebateCategoriesService } from "../rebateCategory/services/service";
import moment from "moment";
import { useDispatch } from "react-redux";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import {
  addEmployeeFamily,
  getAllEmployeeFamilyAction,
  removeEmployeeFamily,
  updateEmployeeFamily,
} from "../employee/store/actions";
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

  const [familyImage, setFamilyImage] = useState([]);
  const [disableAdd, setDisableAdd] = useState(false);
  const [familyMemberId, setfamilyMemberId] = useState("");

  const {
    employee,
    addFamilyLoader,
    updateFamilyLoader,
    success,
  } = useSelector((state) => state.employeeSlice);

  console.log(employee.family);

  useEffect(() => {
    //TODO: dispatch get all family member
    dispatch(getAllEmployeeFamilyAction(param.id));
  }, []);
  console.log(form.getFieldsValue(), "fields value");
  useEffect(() => {
    if (success) {
      //TODO: reset fields and image here
      form.setFieldsValue({
        dateOfBirth: moment(),
        firstName: "",
        email: "",
        lastName: "",
        contactNo: "",
        relationId: "",
      });

      setFamilyImage([]);
    }
  }, [success]);

  const columns = (data) => {
    return [
      {
        title: "Name",
        dataIndex: "firstName",
        ellipsis: true,
        key: "firstName",
      },
      {
        title: "Email",
        dataIndex: "email",
        ellipsis: true,
        key: "email",
        // render: (value, _, index) => {
        //   // return employeeRebate.filter((item) => item.id === value)[index].name;
        // },
      },
      {
        title: "Relation",
        render: (value) => {
          return EmployeeFamilyRelationEnum.filter(
            (item) => item.value === value.relationId
          ).map((obj) => obj.label);
        },
      },
      {
        title: "Contact No.",
        dataIndex: "contactNo",
        ellipsis: true,
        key: "contactNo",
      },
      {
        title: "Date Of Birth",
        dataIndex: "dateOfBirth",
        ellipsis: true,
        key: "dateOfBirth",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: "Action",
        render: (value, __, rowIndex) => {
          return (
            <div className="flex gap-x-2">
              <a
                href=" "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isEdit) {
                    setDisableAdd(true);
                    console.log(data[rowIndex]);
                    form.setFieldsValue({
                      firstName: data[rowIndex].firstName,
                      lastName: data[rowIndex].lastName,
                      dateOfBirth: moment(data[rowIndex].dateOfBirth),
                      contactNo: data[rowIndex].contactNo,
                      email: data[rowIndex].email,
                      relationId: data[rowIndex].relationId,
                    });
                    setfamilyMemberId(data[rowIndex].id);
                    if (data[rowIndex].image) {
                      setFamilyImage(data[rowIndex].image);
                    }
                    // handleRowChange(rowIndex);
                    // setRebateId(data[rowIndex].id);
                  } else {
                    // const filterArray = data.filter((value, i) => {
                    //   if (rowIndex !== i) return value;
                    // });
                    // setRebateEmployee(filterArray);
                  }
                }}
              >
                Edit
              </a>
              <a
                href=" "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isEdit) {
                    //dispatch remove family api
                    dispatch(removeEmployeeFamily(data[rowIndex].id));
                  }
                }}
              >
                Delete
              </a>
            </div>
          );
        },
      },
    ];
  };

  const imageUpload = (att) => {
    console.log(att);
    setFamilyImage(att);
  };

  const handleSubmit = async () => {
    form.submit();

    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        let data;
        console.log(form.getFieldsValue(), "fields value");
        if (Object.keys(familyImage).length) {
          data = {
            ...form.getFieldsValue(),
            dateOfBirth: moment(form.getFieldValue("dateOfBirth")._ds).format(),
            userId: param.id,
            image: {
              id: STRINGS.DEFAULTS.guid,
              file: familyImage[0],
            },
          };
          //TODO: dispatch add family member
          // form.resetFields();
          console.log(data);
          dispatch(addEmployeeFamily(data));
          setFamilyImage([]);
        } else {
          data = {
            ...form.getFieldsValue(),
            userId: param.id,
            dateOfBirth: moment(form.getFieldValue("dateOfBirth")._ds).format(),
          };
          console.log(data);
          //TODO: dispatch add family member
          // form.resetFields();
          dispatch(addEmployeeFamily(data));
          setFamilyImage([]);
        }
      }
    } catch (e) {
      console.log("error in try catch", e);
    }
  };

  const handleUpdate = async () => {
    form.submit();

    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        let data;
        console.log(form.getFieldsValue(), "fields value");
        if (Object.keys(familyImage).length) {
          data = {
            ...form.getFieldsValue(),
            dateOfBirth: moment(form.getFieldValue("dateOfBirth")._ds).format(),
            userId: param.id,
            id: familyMemberId,
            image: {
              id: STRINGS.DEFAULTS.guid,
              file: familyImage,
            },
          };
          //TODO: dispatch add family member
          // form.resetFields();
          console.log(data);
          dispatch(updateEmployeeFamily(data));
          setFamilyImage([]);
        } else {
          data = {
            ...form.getFieldsValue(),
            userId: param.id,
            id: familyMemberId,
            dateOfBirth: moment(form.getFieldValue("dateOfBirth")._ds).format(),
          };
          console.log(data);
          //TODO: dispatch add family member
          // form.resetFields();
          dispatch(updateEmployeeFamily(data));
          setFamilyImage([]);
          setDisableAdd(false);
        }
      }
    } catch (e) {
      console.log("error in try catch", e);
    }
  };

  return (
    <div className="employeeForm">
      <Divider orientation="left">Family Info</Divider>
      <Form name="familyInfo" layout={"vertical"} form={form}>
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
          onClick={handleSubmit}
          disabled={disableAdd ? true : false}
          loading={addFamilyLoader ? true : false}
        >
          Add Family
        </Button>
        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdate}
            disabled={!disableAdd ? true : false}
            loading={updateFamilyLoader ? true : false}
          >
            Update Family
          </Button>
        )}
      </div>
      {employee.family.length > 0 && (
        <div className="rebateTable" style={{ marginTop: "1rem" }}>
          <Table
            columns={columns(employee.family)}
            dragable={true}
            dataSource={employee.family}
          />
        </div>
      )}
    </div>
  );
}

export default EmployeeFamily;
