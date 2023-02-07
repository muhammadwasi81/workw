import { Button, Form, Input, Avatar, Select, DatePicker } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
// import NewSelect from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllEmployees,
  getRewardCategory,
} from "../../../../utils/Shared/store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { resignationDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getNameForImage, STRINGS } from "../../../../utils/base";
import { emptyEmployeesData } from "../../../../utils/Shared/store/slice";
import { addResignation } from "../store/action";
import { ResignationPurposeEnum, ResignationTypeEnum } from "../enums";
import TextArea from "antd/lib/input/TextArea";

import moment from "moment";
const { Option } = Select;

const initialState = {
  id: "",
  name: "",
  reason: "",
  description: "",
  categoryId: "",
  imageId: "",
  members: [
    {
      memberId: "",
      memberType: 1,
    },
  ],
  approvers: [
    {
      approverId: "",
      approverType: 0,
      isDefault: true,
      status: 1,
      email: "",
    },
  ],
};

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, resignationDictionary } = resignationDictionaryList[
    userLanguage
  ];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [showMember, setShowMember] = useState(false)
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { rewardCategories } = useSelector((state) => state.sharedSlice);
  const { createLoader } = useSelector((state) => state.resignationSlice);
  const { success } = useSelector((state) => state.rewardSlice);
  const employees = useSelector((state) => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
  };
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    dispatch(getRewardCategory());
  }, []);

  const handleMember = (val) => {
    setNewState({
      ...newState,
      members: [...val],
    });
  };

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const [newState, setNewState] = useState({
    members: [],
    memberType: null,
  });

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (employees.length !== 0) {
      dispatch(emptyEmployeesData());
      setIsFirstTimeDataLoaded(false);
    }
    dispatch(getRewardCategory());
  }, []);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const handleResignationType = (val) => {
    if (val === 1 || val === 2) {
      setShowMember(true) 
    } else {
      setShowMember(false)
    }
  }

  const onFinish = (values) => {
    let hr = [];
    let finance = [];
    let it = [];
    let admin = [];
    let other = [];
    let exit = [];
    let reportingTo = [];

    if (typeof values.reportingTo === "string") {
      reportingTo.push({
        approverId: values.reportingTo,
      });
    } else {
      reportingTo = values.reportingTo.map((reportingTo) => {
        return {
          approverId: reportingTo,
        };
      });
    }

    if (typeof values.hr === "string") {
      hr.push({
        approverId: values.hr,
      });
    } else {
      hr = values.hr.map((hr) => {
        return {
          approverId: hr,
        };
      });
    }

    if (typeof values.finance === "string") {
      finance.push({
        approverId: values.finance,
      });
    } else {
      finance = values.finance.map((finance) => {
        return {
          approverId: finance,
        };
      });
    }

    if (typeof values.it === "string") {
      it.push({
        approverId: values.it,
      });
    } else {
      it = values.it.map((it) => {
        return {
          approverId: it,
        };
      });
    }

    if (typeof values.admin === "string") {
      admin.push({
        approverId: values.admin,
      });
    } else {
      admin = values.admin.map((admin) => {
        return {
          approverId: admin,
        };
      });
    }

    if (typeof values.other === "string") {
      other.push({
        approverId: values.other,
      });
    } else {
      other = values.other.map((other) => {
        return {
          approverId: other,
        };
      });
    }

    if (typeof values.exit === "string") {
      exit.push({
        approverId: values.exit,
      });
    } else {
      exit = values.exit.map((exit) => {
        return {
          approverId: exit,
        };
      });
    }

    let payload = {
      ...values,
      hr,
      it,
      finance,
      admin,
      other,
      exit,
      reportingTo,
      resignationDate: moment(values.resignationDate._d).format(),
    };

    let image = {
      id: STRINGS.DEFAULTS.guid,
      file: profileImage && profileImage[0]?.originFileObj,
    };

    if (Object.keys(image).length > 0) {
      let data = { ...payload, image };
      dispatch(addResignation(data));
      console.log("composerrrr",data);
    } else {
      dispatch(addResignation(payload));
    }
  };
  useEffect(() => {
    if (success) {
      form.resetFields();
    }
  }, [success]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="addResignation"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={resignationDictionary.selectReason}
          name="purposeId"
          rules={[
            {
              required: true,
              message: "Please Select Reason",
            },
          ]}
        >
          <Select
            showSearch
            placeholder={resignationDictionary.selectReason}
            optionFilterProp="children"
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          >
            {ResignationPurposeEnum.map((item) => (
              <Option value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <div className="" style={{ display: "flex" }}>
          <Form.Item
            label={resignationDictionary.type}
            name="type"
            rules={[
              {
                required: true,
                message: "Please Select Type",
              },
            ]}
            style={{ width: showMember === true ? "95%" : "100%" }}
          >
            <Select
              showSearch
              placeholder={resignationDictionary.selectType}
              optionFilterProp="children"
              style={{
                width: showMember === true ? "95%" : "100%",
                borderRadius: "5px",
              }}
              size="large"
              onChange={handleResignationType}
            >
              {ResignationTypeEnum.map((item) => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </Select>
          </Form.Item>
          {
            showMember === true ? 
            <Form.Item
            name="userId"
            label={resignationDictionary.selectMember}
            showSearch={true}
            direction={Direction}
            style={{ marginBottom: "0px", width: "100%" }}
          >
            <CustomSelect
              style={{ marginBottom: "0px" }}
              data={firstTimeEmpData}
              selectedData={selectedData}
              canFetchNow={isFirstTimeDataLoaded}
              fetchData={fetchEmployees}
              // placeholder={"Select Members"}
              mode={"multiple"}
              isObject={true}
              loadDefaultData={false}
              optionComponent={(opt) => {
                return (
                  <>
                    <Avatar
                      name={opt.name}
                      src={opt.image}
                      className="!bg-black"
                    >
                      {getNameForImage(opt.name)}
                    </Avatar>
                    {opt.name}
                  </>
                );
              }}
              dataVal={value}
              name="userId"
              showSearch={true}
              direction={Direction}
              rules={[
                {
                  required: true,
                  message: "Please Select Member",
                },
              ]}
            />
          </Form.Item> : ""
          }
        </div>

        <Form.Item
          label={resignationDictionary.resignationDate}
          name="resignationDate"
          rules={[
            {
              required: true,
              message: "Please Select Date",
            },
          ]}
        >
          <DatePicker size="large" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label={resignationDictionary.description} name="description">
          <TextArea placeholder={resignationDictionary.enterDescription} />
        </Form.Item>

        <Form.Item
          name="reportingTo"
          label={resignationDictionary.manager}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: "0px" }}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={resignationDictionary.selectMember}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="reportingTo"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Member",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="hr"
          label={resignationDictionary.hr}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: "0px" }}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={resignationDictionary.selectHr}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="hr"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Member",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="finance"
          label={resignationDictionary.finance}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: "0px" }}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={resignationDictionary.selectFinance}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="finance"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Member",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="it"
          label={resignationDictionary.IT}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: "0px" }}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={resignationDictionary.selectItMember}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="it"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Member",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="admin"
          label={resignationDictionary.admin}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: "0px" }}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={resignationDictionary.selectAdmin}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="admin"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Member",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="other"
          label={resignationDictionary.otherApprovals}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: "0px" }}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={resignationDictionary.selectMember}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="other"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Member",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="exit"
          label={resignationDictionary.exitInterview}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: "0px" }}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={resignationDictionary.selectMember}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="exit"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Member",
              },
            ]}
          />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload
            handleImageUpload={handleImageUpload}
            img="Add Image"
            position="flex-start"
            uploadText={resignationDictionary.upload}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            loading={createLoader}
            title={resignationDictionary.create}
          >
            {" "}
            {resignationDictionary.createResignation}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
