import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { employeeDictionaryList } from "../localization/index";
import {
  DatePicker,
  Checkbox,
  Form,
  Divider,
  Input,
  Button,
  Table,
} from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import moment from "moment";
import { getEducationDetailByUser } from "../../education/store/actions";
const { RangePicker } = DatePicker;

const EducationForm = ({ id, mode, isSubmit }) => {
  const isEdit = mode === "edit";
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const [isPresent, setIsPresent] = useState(false);
  const { employeesDictionary, Direction } = employeeDictionaryList[
    userLanguage
  ];
  const {
    employee: { educationdetails },
  } = useSelector((state) => state.employeeSlice);
  const labels = employeesDictionary.EducationForm;
  const placeholder = employeesDictionary.placeholders;
  const [educationDetails, setEducationDetails] = useState([]);
  const [form] = Form.useForm();
  Object.defineProperty(form, "values", {
    value: function() {
      return educationDetails.map((item) => {
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
  useEffect(() => {
    setEducationDetails([]);
  }, [isSubmit]);

  const initialState = {
    degree: "",
    institute: "",
    description: "",
    totalMarks: "",
    obtainedMarks: "",
    startDate: "",
    cityId: "",
    isPresent: false,
  };
  const [initialValues, setInitialValues] = useState(initialState);

  const columns = () => [
    {
      title: labels.Degree,
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: labels.Institute,
      dataIndex: "institute",
      key: "institute",
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
      title: labels.Description,
      dataIndex: "description",
      key: "description",
    },
    {
      title: labels.ObtainedMarks,
      dataIndex: "obtainedMarks",
      key: "obtainedMarks",
    },
    {
      title: labels.TotalMarks,
      dataIndex: "totalMarks",
      key: "totalMarks",
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
      render: (value, row, rowIndex) => {
        return (
          <a
            href=" "
            onClick={function(e) {
              e.preventDefault();
              if (isEdit) {
                handleRowChange(rowIndex);
              } else {
                const filterArray = educationDetails.filter((value, i) => {
                  if (rowIndex !== i) return value;
                });
                setEducationDetails(filterArray);
              }
            }}
          >
            {isEdit ? sharedLabels.Edit : sharedLabels.Delete}
          </a>
        );
      },
    },
  ];

  const handleRowChange = (rowIndex) => {
    setInitialValues(educationDetails[rowIndex]);
    let bankDetailsArr = [...educationDetails];
    bankDetailsArr.splice(rowIndex, 1);
    setEducationDetails(bankDetailsArr);
  };
  const handleAddMore = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        setEducationDetails((preValues) => [
          ...preValues,
          form.getFieldsValue(),
        ]);
        form.resetFields();
        setIsPresent(false);
        setInitialValues(initialState);
      }
    } catch (e) {}
  };
  useEffect(() => {
    form.setFieldsValue(initialValues);
    if (isEdit) setIsPresent(initialValues.isPresent);
  }, [initialValues, form]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getEducationDetailByUser(id));
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setEducationDetails(
        educationdetails?.map((item) => {
          return {
            ...item,
            startDate: item.isPresent
              ? moment(item.startDate)
              : [moment(item.startDate), moment(item.endDate)],
          };
        })
      );
    }
  }, [educationdetails]);

  const handleUpdate = () => {
    console.log("handle Update");
  };
  let classes = "employeeForm educationDetails ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  return (
    <div className={classes}>
      <Divider orientation="left"> {labels.EducationInfo}</Divider>
      <Form
        name="educationDetails"
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
          name="degree"
          label={labels.Degree}
        >
          <Input placeholder={placeholder.degree}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="institute"
          label={labels.Institute}
        >
          <Input placeholder={placeholder.institute}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="description"
          label={labels.Description}
        >
          <Input placeholder={placeholder.desc}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="totalMarks"
          label={labels.TotalMarks}
        >
          <Input type="number" placeholder={placeholder.tMarks}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="obtainedMarks"
          label={labels.ObtainedMarks}
        >
          <Input type="number" placeholder={placeholder.oMarks}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="cityId"
          label={labels.City}
        >
          <Input placeholder="Select City"></Input>
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
                getPopupContainer={(trigger) => trigger.parentNode}
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
                getPopupContainer={(trigger) => trigger.parentNode}
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
          {labels.AddEducation}
        </Button>

        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdate}
          >
            {labels.UpdateEducation}
          </Button>
        )}
      </div>
      {educationDetails.length > 0 && (
        <Table
          columns={columns()}
          dragable={true}
          dataSource={educationDetails}
        />
      )}
    </div>
  );
};

export default EducationForm;
