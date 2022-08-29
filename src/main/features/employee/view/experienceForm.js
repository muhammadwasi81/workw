import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Table,
} from "antd";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { employeeDictionaryList } from "../localization/index";
import "../Styles/employeeForm.css";
import { employmentType } from "../../../../utils/Shared/enums/enums";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserWorkExperience } from "../../experienceInfo/store/actions";
import moment from "moment";

const { RangePicker } = DatePicker;

const { Option } = Select;
const EmergencyForm = ({ mode, id, isSubmit }) => {
  const isEdit = mode === "edit";
  const dispatch = useDispatch();
  const [workInfo, setWorkInfo] = useState([]);
  const [form] = Form.useForm();
  Object.defineProperty(form, "values", {
    value: function() {
      return workInfo.map((item) => {
        return {
          ...item,
          startDate: moment(item[0]?.startEndDate?._ds)?.format(),
          endDate: item?.isPresent
            ? ""
            : moment(item[1]?.startEndDate?._ds)?.format(),
        };
      });
    },
    writable: true,
    enumerable: true,
    configurable: true,
  });
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const [isPresent, setIsPresent] = useState(false);
  const { employeesDictionary, Direction } = employeeDictionaryList[
    userLanguage
  ];
  const {
    employee: { experiencedetails },
  } = useSelector((state) => state.employeeSlice);
  const initialState = {
    position: "",
    employmentTypeId: "",
    cityId: "",
    startDate: "",
    isPresent: false,
  };
  const [initialValues, setInitialValues] = useState(initialState);
  const labels = employeesDictionary.WorkExperienceForm;
  const placeholder = employeesDictionary.placeholders;

  useEffect(() => {
    form.setFieldsValue(initialValues);
    if (isEdit) setIsPresent(initialValues.isPresent);
  }, [initialValues, form]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getUserWorkExperience(id));
    }
  }, []);
  useEffect(() => {
    setWorkInfo([]);
  }, [isSubmit]);
  useEffect(() => {
    if (isEdit)
      setWorkInfo(
        experiencedetails?.map((item) => {
          return {
            ...item,
            startDate: item.isPresent
              ? moment(item.startDate)
              : [moment(item.startDate), moment(item.endDate)],
          };
        })
      );
  }, [experiencedetails]);

  const handleUpdate = () => {
    console.log("handle udpate");
  };
  const handleAddMore = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation)
        setWorkInfo((preValues) => [...preValues, form.getFieldsValue()]);
      form.resetFields();
      setIsPresent(false);
      setInitialValues(initialState);
    } catch (e) {}
  };

  const handleRowChange = (rowIndex) => {
    setInitialValues(workInfo[rowIndex]);
    const workInfoArr = [...workInfo];
    workInfoArr.splice(rowIndex, 1);
    setWorkInfo(workInfoArr);
  };
  const columns = [
    {
      title: labels.Position,
      dataIndex: "position",
      key: "position",
    },

    {
      title: labels.EmploymentType,
      dataIndex: "employmentTypeId",
      key: "employmentTypeId",
      render: (value) => {
        return value.children;
      },
    },
    {
      title: labels.City,
      dataIndex: "cityId",
      key: "cityId",
      render: (value) => {
        // return cities[value];
      },
    },
    {
      title: labels.StartEndDate,
      dataIndex: "startDate",
      key: "startDate",
      render: (value, row) => {
        return value?.length
          ? `${moment(row.startDate[0]).format("YYYY/MM/DD")} - ${moment(
              row.startDate[1]
            ).format("YYYY/MM/DD")}`
          : `${moment(row.start).format("YYYY/MM/DD")} -  Present`;
      },
    },

    {
      title: sharedLabels.action,
      render: (value, __, rowIndex) => {
        return (
          <a
            href=" "
            onClick={(e) => {
              console.log(rowIndex, "rowIndex");
              e.preventDefault();
              if (isEdit) {
                handleRowChange(rowIndex);
                console.log("edit");
              } else {
                console.log("delete");
                const index = workInfo.findIndex((object) => {
                  return object === value;
                });
                const filterArray = workInfo.filter((value, i) => {
                  if (index !== i) return value;
                });
                setWorkInfo(filterArray);
              }
            }}
          >
            {isEdit ? sharedLabels.Edit : sharedLabels.Delete}
          </a>
        );
      },
    },
  ];

  let classes = "employeeForm workInfo ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  return (
    <div className={classes}>
      <Divider orientation="left"> {labels.WorkExperienceInfo}</Divider>
      <Form
        name="workInfo"
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
          name="position"
          label={labels.Position}
        >
          <Input placeholder={placeholder.position}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="employmentTypeId"
          label={labels.EmploymentType}
        >
          <Select
            placeholder={placeholder.empType}
            size="large"
            onChange={(value, object) =>
              form.setFieldValue("employmentTypeId", object)
            }
          >
            {employmentType.map((item) => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="city"
          label={labels.City}
        >
          <Input placeholder={placeholder.City}></Input>
        </Form.Item>
        <div className="dates">
          {!isPresent && (
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="startDate"
              label={labels.StartEndDate}
            >
              <RangePicker
                size="large"
                format={"DD/MM/YYYY"}
                placeholder={[placeholder.sDate, placeholder.eDate]}
              />
            </Form.Item>
          )}

          {isPresent && (
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="startDate"
              label={labels.StartDate}
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                placeholder={labels.start}
                size="large"
              />
            </Form.Item>
          )}

          <Form.Item name="isPresent" valuePropName="checked">
            <Checkbox
              onChange={() => {
                setIsPresent(!isPresent);
                form.setFieldValue("startDate", "");
                form.setFieldValue("startEndDate", "");
              }}
            >
              {labels.Present}
            </Checkbox>
          </Form.Item>
        </div>
      </Form>
      <div className={isEdit ? "editButtons" : "buttons"}>
        <Button
          type="dashed"
          className="btn addMore"
          icon={<PlusOutlined />}
          onClick={handleAddMore}
        >
          {labels.AddExperience}
        </Button>

        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdate}
          >
            {labels.UpdateExperience}
          </Button>
        )}
      </div>

      {workInfo.length > 0 && (
        <Table columns={columns} dragable={true} dataSource={workInfo} />
      )}
    </div>
  );
};

export default EmergencyForm;
