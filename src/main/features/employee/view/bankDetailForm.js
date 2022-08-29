import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { employeeDictionaryList } from "../localization/index";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import "../Styles/employeeForm.css";
import { useDispatch } from "react-redux";
import { getCountries } from "../../../../utils/Shared/store/actions";
import { useSelector } from "react-redux";
import { getBankDetailByUser } from "../../bankDetails/store/actions";
const { Option } = Select;
const BankForm = ({ mode, id, isSubmit }) => {
  const isEdit = mode === "edit";
  const [bankDetails, setBankDetails] = useState([]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const { countries: countriesSlice } = useSelector(
    (state) => state.sharedSlice
  );
  const {
    employee: { bankdetails },
  } = useSelector((state) => state.employeeSlice);
  const { employeesDictionary, Direction } = employeeDictionaryList[
    userLanguage
  ];
  const initialState = {
    accountNumber: "",
    accountTitle: "",
    bankBranchCode: "",
    bankName: "",
    cityId: [],
    countryId: [],
    ibanNumber: "",
    sortCode: "",
  };
  const [initialValues, setInitialValues] = useState(initialState);
  const labels = employeesDictionary.BankForm;
  const placeholder = employeesDictionary.placeholders;
  const [form] = Form.useForm();

  Object.defineProperty(form, "values", {
    value: function() {
      return bankDetails.map((item) => {
        return {
          ...item,
          cityId: item.cityId.id,
          countryId: item.countryId.value,
        };
      });
    },
    writable: true,
    enumerable: true,
    configurable: true,
  });

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  useEffect(() => {
    if (isEdit) {
      if (!countriesSlice.length) dispatch(getCountries());
      dispatch(getBankDetailByUser(id));
    }
  }, []);

  useEffect(() => {
    setBankDetails([]);
  }, [isSubmit]);

  useEffect(() => {
    if (isEdit) setBankDetails(bankdetails);
  }, [bankdetails]);

  useEffect(() => {
    setCountries(countriesSlice);
  }, [countriesSlice]);

  const handleAddMore = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        setBankDetails((preValues) => [...preValues, form.getFieldsValue()]);
        form.resetFields();
        setInitialValues(initialState);
      }
    } catch (e) {}
  };
  const handleUpdate = () => {
    console.log("handle update");
  };

  const handleRowChange = (rowIndex) => {
    setInitialValues(bankDetails[rowIndex]);
    let bankDetailsArr = [...bankDetails];
    bankDetailsArr.splice(rowIndex, 1);
    setBankDetails(bankDetailsArr);
  };
  const columns = [
    {
      title: "Bank Name",
      dataIndex: "bankName",
      ellipsis: true,
      key: "bankName",
    },
    {
      title: "Account Name",
      dataIndex: "accountTitle",
      ellipsis: true,
      key: "accountTitle",
    },
    {
      title: "Branch Code",
      dataIndex: "bankBranchCode",
      ellipsis: true,
      key: "bankBranchCode",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      ellipsis: true,
      key: "accountNumber",
    },
    {
      title: "IBN",
      dataIndex: "ibanNumber",
      ellipsis: true,
      key: "ibanNumber",
    },
    {
      title: "Sort Code",
      dataIndex: "sortCode",
      ellipsis: true,
      key: "sortCode",
    },
    {
      title: "Country",
      dataIndex: "countryId",
      ellipsis: true,
      key: "countryId",
      render: (labels) => {
        return labels.children;
      },
    },
    {
      title: "City",
      dataIndex: "cityId",
      ellipsis: true,
      key: "cityId",
      render: (labels) => {
        // return citiesArr.map((item) => <span>{item.name}</span>);
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
              if (isEdit) {
                handleRowChange(rowIndex);
              } else {
                const filterArray = bankDetails.filter((value, i) => {
                  if (rowIndex !== i) return value;
                });
                setBankDetails(filterArray);
              }
            }}
          >
            {isEdit ? sharedLabels.Edit : sharedLabels.Delete}
          </a>
        );
      },
    },
  ];

  let classes = "employeeForm bankDetails ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  return (
    <div className={classes}>
      <Divider orientation="left"> {labels.BankInfo}</Divider>
      <Form
        name="bankDetails"
        form={form}
        layout={"vertical"}
        initialValues={initialValues}
        onFinish={() => {
          console.log("bankDetails");
        }}
      >
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="bankName"
          label={labels.BankName}
        >
          <Input placeholder={placeholder.bankName}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="accountTitle"
          label={labels.AccountTitle}
        >
          <Input placeholder={placeholder.accTitle}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="bankBranchCode"
          label={labels.BranchCode}
        >
          <Input placeholder={placeholder.branchCode}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="accountNumber"
          label={labels.AccountNumber}
        >
          <Input placeholder={placeholder.accNo}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="ibanNumber"
          label={labels.IBAN}
        >
          <Input placeholder={placeholder.iban}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="sortCode"
          label={labels.SortCode}
        >
          <Input placeholder={placeholder.sortCode}></Input>
        </Form.Item>
        <Form.Item
          name="countryId"
          label={labels.Country}
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Please select country."
            size="large"
            onChange={(value, object) =>
              form.setFieldValue("countryId", object)
            }
          >
            {countries.map((item) => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="cityId"
          label={labels.City}
          showSearch={true}
          rules={[{ required: true }]}
        >
          <NewCustomSelect
            name="cityId"
            label={labels.cityId}
            showSearch={true}
            // mode="multiple"
            endPoint="/api/Utility/GetAllCities"
            requestType="post"
            placeholder={"Please select city."}
            valueObject={true}
            onChange={(value, obj) => {
              console.log(obj, "obj");
              form.setFieldValue("cityId", JSON.parse(obj.value));
            }}
          />
        </Form.Item>
      </Form>
      <div className={isEdit ? "editButtons" : "buttons"}>
        <Button
          type="dashed"
          className="btn addMore"
          icon={<PlusOutlined />}
          onClick={handleAddMore}
        >
          {labels.AddBank}
        </Button>

        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdate}
          >
            {labels.updateBank}
          </Button>
        )}
      </div>

      {bankDetails.length > 0 && (
        <Table columns={columns} dragable={true} dataSource={bankDetails} />
      )}
    </div>
  );
};

export default BankForm;
