import { Button, DatePicker, Divider, Form, Input, Select, Table } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { EditOutlined } from "@ant-design/icons";
import SingleUpload from "../../sharedComponents/Upload/singleUpload";
import { getAllRebateCategoriesService } from "../rebateCategory/services/service";
import moment from "moment";
import { useDispatch } from "react-redux";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import {
  addEmployeeRebate,
  getAllEmployeeRebate,
  updateEmployeeRebate,
} from "./store/actions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createGuid, STRINGS } from "../../../utils/base";
import { any } from "prop-types";
import FileUploader from "../Messenger/view/MessengerBox/components/fileUploader";

function RebateEmployee({ mode }) {
  const isEdit = mode === "edit";
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const param = useParams();
  const initialState = {
    amount: "",
    category: "",
    date: "",
  };
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const [rebateEmployee, setRebateEmployee] = useState([]);
  const [rebateId, setRebateId] = useState("");
  const [rebateCategory, setRebateCategory] = useState([]);
  const [initialValues, setInitialValues] = useState(initialState);
  const [rebateImage, setRebateImag] = useState([]);
  const { employeeRebate } = useSelector((state) => state.employeeRebateSlice);
  const [disableAdd, setDisableAdd] = useState(false);

  useEffect(() => {
    getRebateCategory();
    dispatch(getAllEmployeeRebate(param.id));
  }, []);

  // Object.defineProperty(form, "values", {
  //   value: function() {
  //     return {
  //       ...form.getFieldsValue(),
  //       date: moment(form.getFieldValue("date")._ds).format(),
  //     };
  //   },
  //   writable: true,
  //   enumerable: true,
  //   configurable: true,
  // });

  useEffect(() => {
    if (isEdit)
      setRebateEmployee(
        employeeRebate?.map((item) => {
          return {
            ...item,
            startDate: item.isPresent
              ? moment(item.startDate)
              : [moment(item.startDate), moment(item.endDate)],
          };
        })
      );
  }, [employeeRebate]);

  useEffect(() => {
    if (employeeRebate.length > 0) {
      setRebateEmployee(employeeRebate);
    }
  }, [employeeRebate]);

  const getRebateCategory = async () => {
    try {
      const { data, responseCode } = await getAllRebateCategoriesService();
      if (responseCode === 1001) setRebateCategory(data);
    } catch (e) {}
  };
  useEffect(() => {
    console.log("rebateEmployee", rebateEmployee);
  }, [rebateEmployee]);

  const handleRowChange = (rowIndex) => {
    console.log(rebateEmployee[rowIndex], "sss");
    setInitialValues(rebateEmployee[rowIndex]);
    const newPayload = {
      amount: rebateEmployee[rowIndex].amount,
      categoryId: rebateEmployee[rowIndex].categoryId,
      date: moment(rebateEmployee[rowIndex].date),
    };
    form.setFieldsValue(newPayload);
    // const rebateInfoArr = [...employeeRebate];
    // rebateInfoArr.splice(rowIndex, 1);
    // setRebateEmployee(rebateInfoArr);
  };

  const handleSubmit = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        if (isEdit) {
          if (Object.keys(rebateImage).length) {
            const payload = {
              ...form.getFieldsValue(),
              userId: param.id,
              attachment: {
                id: STRINGS.DEFAULTS.guid,
                file: rebateImage,
              },
            };
            dispatch(addEmployeeRebate(payload));
            // form.resetFields();
            setRebateImag([]);
          } else {
            const payload = { ...form.getFieldsValue(), userId: param.id };
            console.log(payload);
            dispatch(addEmployeeRebate(payload));
            // form.resetFields();
            setRebateImag([]);
          }
        }
        // setRebateEmployee((preValue) => [...preValue, form.getFieldsValue()]);
      }
    } catch (e) {}
  };

  const columns = (data) => {
    return [
      {
        title: "Amount",
        dataIndex: "amount",
        ellipsis: true,
        key: "amount",
      },
      {
        title: "Category",
        dataIndex: "category",
        ellipsis: true,
        key: "category",
        // render: (value, _, index) => {
        //   // return employeeRebate.filter((item) => item.id === value)[index].name;
        // },
      },
      {
        title: "Date",
        dataIndex: "date",
        ellipsis: true,
        key: "date",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: sharedLabels.action,
        render: (value, __, rowIndex) => {
          return (
            <a
              href=" "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isEdit) {
                  setDisableAdd(true);
                  handleRowChange(rowIndex);
                  setRebateId(data[rowIndex].id);
                } else {
                  const filterArray = data.filter((value, i) => {
                    if (rowIndex !== i) return value;
                  });
                  setRebateEmployee(filterArray);
                }
              }}
            >
              {isEdit ? sharedLabels.Edit : sharedLabels.Delete}
            </a>
          );
        },
      },
    ];
  };

  const imageUpload = (att) => {
    console.log(att);
    setRebateImag(att);
  };

  const handleUpdate = async () => {
    form.submit();
    const isValidation = await form.validateFields();

    try {
      if (isValidation) {
        const value = form.getFieldsValue();
        const categoryId = rebateCategory.filter(
          (item) => item.id === value.categoryId
        );
        // console.log(form.getFieldValue("date")._d;
        // return;
        let fieldsValue = {
          ...form.getFieldsValue(),
          date: form.getFieldValue("date")._d,
          categoryId: categoryId[0].id,
        };

        console.log(fieldsValue);

        if (Object.keys(rebateImage).length) {
          fieldsValue = {
            id: rebateId,
            categoryId: categoryId[0].id,
            date: form.getFieldValue("date"),
            userId: param.id,
            attachment: {
              id: STRINGS.DEFAULTS.guid,
              file: rebateImage,
            },
          };
          //dispatch update
          dispatch(updateEmployeeRebate(fieldsValue));
          form.setFieldsValue({
            date: moment(),
            amount: "",
            categoryId: "",
          });

          setRebateImag([]);
        } else {
          fieldsValue = {
            id: rebateId,
            categoryId: categoryId[0].id,
            date: form.getFieldValue("date"),
            userId: param.id,
          };
          //dispatch update
          dispatch(updateEmployeeRebate(fieldsValue));
          form.setFieldsValue({
            date: moment(),
            amount: "",
            categoryId: "",
          });

          setRebateImag([]);
        }
        console.log(fieldsValue);
        //set enable add
        setDisableAdd(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="employeeForm">
      <Divider orientation="left">Rebate Info</Divider>
      <Form
        name="rebateInfo"
        layout={"vertical"}
        form={form}
        initialValues={initialValues}
      >
        <Form.Item name="amount" label={"Amount"} rules={[{ required: true }]}>
          <Input placeholder="Amount" type="number" />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label={"Category"}
          rules={[{ required: true }]}
        >
          <Select placeholder="Category" size="large">
            {rebateCategory.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="date" label={"Date"} rules={[{ required: true }]}>
          <DatePicker
            getPopupContainer={(trigger) => trigger.parentNode}
            format={"DD/MM/YYYY"}
            placeholder="Select Date"
            size="large"
          />
        </Form.Item>
        <Form.Item area="true" label="Attachments">
          <FileUploader
            url={""}
            value={""}
            fileList={rebateImage ? rebateImage : []}
            uploadButton={<div>Upload</div>}
            handleUpload={(att) => imageUpload(att)}
            isMultiple={false}
            classes=""
          />
        </Form.Item>
      </Form>
      <div className={isEdit ? "editButtons" : "buttons"}>
        <Button
          type="dashed"
          style={{ marginLeft: "auto" }}
          icon={<EditOutlined />}
          onClick={handleSubmit}
          disabled={disableAdd ? true : false}
        >
          Add Rebate
        </Button>
        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdate}
            disabled={!disableAdd ? true : false}
          >
            Update Rebate
          </Button>
        )}
      </div>
      {employeeRebate.length > 0 && (
        <div className="rebateTable" style={{ marginTop: "1rem" }}>
          <Table
            columns={columns(employeeRebate)}
            dragable={true}
            dataSource={rebateEmployee}
          />
        </div>
      )}
    </div>
  );
}

export default RebateEmployee;
