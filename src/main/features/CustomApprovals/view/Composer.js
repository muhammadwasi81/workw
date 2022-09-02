import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
// import Button from "../../../../components/SharedComponent/button/index";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployees, getRewardCategory } from "../../../../utils/Shared/store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { STRINGS } from "../../../../utils/base";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { getAllCustomApprovalCategory } from "../../customApprovalCategory/store/actions";
import { addCustomApproval } from "../store/actions";
import { DEFAULT_GUID } from "../../../../utils/constants";

const initialState = {
  id: "",
  description: "",
  categoryId: "",
  imageId: "",
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
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState("");
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { customApprovalCategories } = useSelector((state) => state.customApprovalCategorySlice);

  const employees = useSelector(state => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
    // setMembers(obj);
    // onChange(data, obj);
  };
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const handleMember = val => {
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
    dispatch(getAllCustomApprovalCategory());
  }, []);

  // const handleImageUpload = (data) => {
  //   setAttachment(data);
  // };

  const onFinish = (values) => {
    let approvers = [];
    if (typeof values.approvers === 'string') {
      approvers.push({
        approverId: values.approvers
      })
    }
    else {
      approvers = values.approvers.map((approver) => {
        return {
          approverId: approver
        };
      });
    }

    let attachments = [{ id: DEFAULT_GUID, file: file }]
    // let image = { id: STRINGS.DEFAULTS.guid, file: profileImage[0].originFileObj }
    let payload = { ...values, approvers, attachments };
    console.log(payload, "FINAL TOUCH")
    dispatch(addCustomApproval(payload));

    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="addCustomApproval"
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
          label={"Subject"}
          name="subject"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: "Please Enter Subject",
            },
          ]}>
          <TextInput placeholder={"Enter Subject"} />
        </Form.Item>

        <Form.Item
          label={customApprovalDictionary.category}
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Please Enter Category",
            },
          ]}>
          <Select
            data={customApprovalCategories}
            placeholder={customApprovalDictionary.category}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={"Amount"}
          name="amount"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: "Please Enter Amount",
            },
          ]}>
          <TextInput placeholder={"Enter Amount"} />
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }} name="approvers" label={customApprovalDictionary.approvers} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={customApprovalDictionary.selectMember}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={opt => {
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
          label={customApprovalDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: customApprovalDictionary.enterDescription,
            },
          ]}>
          <Input.TextArea placeholder={customApprovalDictionary.enterDescription} />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload
            handleImageUpload={(file) => {
              setFile(file[0].originFileObj);
            }}
            img="Add Image" position="flex-start" uploadText={customApprovalDictionary.upload} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="medium" className="ThemeBtn" block htmlType="submit" title={customApprovalDictionary.createReward}>
            {" "}
            {customApprovalDictionary.createCustomApproval}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
