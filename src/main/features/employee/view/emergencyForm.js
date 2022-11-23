import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { employeeDictionaryList } from "../localization/index";
import "../Styles/employeeForm.css";
import { relations } from "../../../../utils/Shared/enums/enums";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserEmergency } from "../../emergencyInfo/store/actions";
import { resetEmergencydetails } from "../store/slice";

const { Option } = Select;
const EmergencyForm = ({ mode, id }) => {
  const isEdit = mode === "edit";
  const [emergencyInfo, setEmergencyInfo] = useState([]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { employeesDictionary, Direction } = employeeDictionaryList[
    userLanguage
  ];
  const {
    employee: { emergencydetails },
    success,
  } = useSelector((state) => state.employeeSlice);

  const initialState = {
    name: "",
    address: "",
    contactNo: "",
    relation: [],
  };
  const [initialValues, setInitialValues] = useState(initialState);
  const labels = employeesDictionary.EmergencyForm;
  const placeholder = employeesDictionary.placeholders;
  const [form] = Form.useForm();
  Object.defineProperty(form, "values", {
    value: function() {
      return emergencyInfo;
    },
    writable: true,
    enumerable: true,
    configurable: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  useEffect(() => {
    if (success) setEmergencyInfo([]);
  }, [success]);

  useEffect(() => {
    if (isEdit) setEmergencyInfo(emergencydetails);
  }, [emergencydetails]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getUserEmergency(id));
    }

    return () => {
      dispatch(resetEmergencydetails());
    };
  }, []);
  const handleAddMore = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation)
        setEmergencyInfo((preValues) => [...preValues, form.getFieldsValue()]);
      form.resetFields();
      setInitialValues(initialState);
    } catch (e) {}
  };

  const handleRowChange = (rowIndex) => {
    setInitialValues(emergencyInfo[rowIndex]);
    const emergencyInfoArr = [...emergencyInfo];
    emergencyInfoArr.splice(rowIndex, 1);
    setEmergencyInfo(emergencyInfoArr);
  };
  const columns = (data) => {
    console.log(data, "data2");
    return [
      {
        title: labels.Name,
        dataIndex: "name",
        key: "name",
      },
      {
        title: labels.Address,
        dataIndex: "address",
        key: "address",
      },
      {
        title: labels.Number,
        dataIndex: "contactNo",
        key: "contactNo",
      },
      {
        title: labels.Relation,
        dataIndex: "relation",
        key: "relation",
        render: (value) => {
          return relations[value - 1]?.name;
        },
      },

      {
        title: sharedLabels.action,
        render: (value, __, rowIndex) => {
          console.log(data, "return");
          return (
            <a
              href=" "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isEdit) {
                  handleRowChange(rowIndex);
                } else {
                  console.log("Data", data);
                  const filterArray = data.filter((value, i) => {
                    if (rowIndex !== i) return value;
                  });
                  setEmergencyInfo(filterArray);
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

  const handleUpdate = () => {
    console.log("handle Update");
  };
  let classes = "employeeForm emergencyInfo ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  return (
    <div className={classes}>
      <Divider orientation="left"> {labels.EmergencyInfo}</Divider>
      <Form
        name="emergencyInfo"
        form={form}
        layout={"vertical"}
        initialValues={initialValues}
      >
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="name"
          label={labels.Name}
        >
          <Input placeholder={placeholder.name}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="address"
          label={labels.Address}
        >
          <Input placeholder={placeholder.address}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="contactNo"
          label={labels.Number}
        >
          <Input placeholder={placeholder.number}></Input>
        </Form.Item>

        <Form.Item
          name="relation"
          label={labels.Relation}
          showSearch={true}
          rules={[{ required: true }]}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder="Please select relation"
            size="large"
          >
            {relations.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <div className={isEdit ? "editButtons" : "buttons"}>
        <Button
          type="dashed"
          className="btn addMore"
          icon={<PlusOutlined />}
          onClick={handleAddMore}
        >
          {labels.AddEmergency}
        </Button>

        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdate}
          >
            {labels.UpdateEmergency}
          </Button>
        )}
      </div>

      {emergencyInfo.length > 0 && (
        <Table
          columns={columns(emergencyInfo)}
          dragable={true}
          dataSource={emergencyInfo}
        />
      )}
    </div>
  );
};

export default EmergencyForm;
