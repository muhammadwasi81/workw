import { Button, Form, Input, Avatar } from "antd";
import React, { useEffect, useState, useContext } from "react";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { addWarning } from "../store/actions";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { getAllWarningCategories } from "../warningCategory/store/actions";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
// import  from "../../../sharedComponents/Avatar/avatarOLD";

const initialState = {
  id: "",
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
  const { Direction, warningDictionary } = warningDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { warningCategories, loader } = useSelector(
    (state) => state.warningCategorySlice
  );

  const employees = useSelector((state) => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
    // setMembers(obj);
    // onChange(data, obj);
  };
  useEffect(() => {
    fetchEmployees("", 0);
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
    dispatch(getAllWarningCategories());
  }, []);

  const onFinish = (values) => {
    let approvers = [];
    let members = [];
    if (typeof values.approvers === "string") {
      approvers.push({
        approverId: values.approvers,
      });
    } else {
      approvers = values.approvers.map((approver) => {
        return {
          approverId: approver,
        };
      });
    }
    if (typeof values.members === "string") {
      members.push({
        memberId: values.members,
      });
    } else {
      members = values.members.map((memeber) => {
        return {
          memberId: memeber,
        };
      });
    }
    let payload = { ...values, approvers, members };

    dispatch(addWarning(payload));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="addWarning"
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
          label={warningDictionary.category}
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Please Enter Category",
            },
          ]}
        >
          <Select
            data={warningCategories}
            placeholder={warningDictionary.category}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="members"
          label={warningDictionary.warningTo}
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
            placeholder={warningDictionary.selectMember}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar
                    name={opt.name}
                    src={opt.image}
                    round={true}
                    width={"30px"}
                    height={"30px"}
                  />
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="members"
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
          name="approvers"
          label={warningDictionary.approvers}
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
            placeholder={warningDictionary.selectApprovers}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar
                    name={opt.name}
                    src={opt.image}
                    round={true}
                    width={"30px"}
                    height={"30px"}
                  />
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="approvers"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Approver",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={warningDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: warningDictionary.enterDescription,
            },
          ]}
        >
          <Input.TextArea placeholder={warningDictionary.enterDescription} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            loading={loader}
            title={warningDictionary.create}
          >
            {" "}
            {warningDictionary.create}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
