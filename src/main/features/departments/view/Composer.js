import { Avatar, Button, Form, Input, Skeleton } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployees,
  getRewardCategory,
} from "../../../../utils/Shared/store/actions";
import { addDepartment } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
// import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import MemberListItem from "../../../sharedComponents/MemberByTag/Index";
import MemberComposer from "./MemberComposer";
import { getNameForImage, STRINGS } from "../../../../utils/base";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import PrivacyOptions from "../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";

const initialState = {
  id: "",
  name: "",
  description: "",
  imageId: "",
  members: [
    {
      memberId: "",
      memberType: 1,
    },
  ],
  hodId: "",
  parentId: "",
};

const Composer = (props) => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.sharedSlice);
  const { success, createLoader, parentId } = useSelector(
    (state) => state.departmentSlice
  );
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [privacyId, setPrivacyId] = useState(1);

  const onPrivacyChange = (value) => {
    setPrivacyId(value);
  };

  //TODO: add these labels in localization
  const labels = {
    public: "Public",
    private: "Private",
  };

  useEffect(() => {
    //TODO:
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, departmentDictionary } = departmentDictionaryList[
    userLanguage
  ];

  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);

  const [state, setState] = useState(initialState);

  const [memberList, setMemberList] = useState([]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const selectedData = (data, obj) => {
    console.log("wrapper select data", data, obj);
  };

  // if (!isFirstTimeDataLoaded) {
  //   return <Skeleton active />;
  // }

  const handleImageUpload = (data) => {
    setProfileImage(data);
    // console.log("Image", data);
  };

  const handelAddMember = (data) => {
    console.log("data of handle member", data);
    setMemberList([...memberList, data]);
  };

  const onFinish = (values) => {
    if (profileImage) {
      let image = {
        id: STRINGS.DEFAULTS.guid,
        file: profileImage[0].originFileObj,
      };
      let payload = { ...values, image, parentId, privacyId };
      dispatch(addDepartment(payload));
    } else {
      let payload = { ...values, parentId, privacyId };
      dispatch(addDepartment(payload));
    }

    // form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="addDepartment"
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
        // className={Direction === "ltr" ? "align-right" : ""}
      >
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Form.Item
              label={departmentDictionary.name}
              name="name"
              labelPosition="top"
              rules={[
                {
                  required: true,
                  message: "Please Write Department Name",
                },
              ]}
            >
              <TextInput placeholder={departmentDictionary.enterName} />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item area="true" style={{ marginBottom: 0 }}>
              <SingleUpload
                handleImageUpload={handleImageUpload}
                img="Add Image"
                position="flex-start"
                uploadText={departmentDictionary.uploads}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label={departmentDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: departmentDictionary.enterDescription,
            },
          ]}
        >
          <Input.TextArea placeholder={departmentDictionary.enterDescription} />
        </Form.Item>

        <Form.Item
          name="hodId"
          label={departmentDictionary.headOfDepartment}
          showSearch={true}
          direction={Direction}
          rules={[{ required: true }]}
        >
          <MemberSelect
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            name="hodId"
            placeholder={departmentDictionary.selectHod}
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
          />
        </Form.Item>

        <MemberComposer
          handleAdd={handelAddMember}
          form={form}
          placeholder={"Search Members"}
          error={"Please Select Members"}
        />
        {memberList?.length > 0 ? (
          <MemberListItem
            data={memberList}
            onRemove={(row, ind) => {
              setMemberList(memberList.filter((_, index) => index !== ind));
            }}
          />
        ) : null}
        <Form.Item
          label={departmentDictionary.addEmployees}
          name="members"
          rules={[
            {
              required: true,
              message: "Employees Required!, Add Employees",
            },
          ]}
        >
          <MemberSelect
            name="managerId"
            mode="multiple"
            formItem={false}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={departmentDictionary.addEmployees}
            selectedData={(_, obj) => {
              setEmployeesData([...obj]);
            }}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex items-center gap-2">
            <PrivacyOptions
              privacyId={privacyId}
              onPrivacyChange={onPrivacyChange}
              labels={labels}
            />
            <Button
              type="primary"
              size="large"
              className="ThemeBtn"
              block
              htmlType="submit"
              title={departmentDictionary.createReward}
              loading={createLoader}
            >
              {" "}
              {departmentDictionary.createDepartment}{" "}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
