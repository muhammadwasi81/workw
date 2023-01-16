import React, { useState, useContext, useEffect } from "react";
import { Form, message, Select, Avatar } from "antd";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
// import Select from "../../../sharedComponents/Select/Select";
import { DepartmentMemberTypeList } from "../constant/index";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
// import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import { getNameForImage } from "../../../../utils/base";

function MemberComposer(props) {
  const { Option } = Select;

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, departmentDictionary } = departmentDictionaryList[
    userLanguage
  ];
  const employees = useSelector((state) => state.sharedSlice.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);
  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const [newState, setNewState] = useState({
    member: {},
    memberType: null,
  });

  const handleMember = (obj) => {
    setNewState({
      ...newState,
      user: obj,
    });
  };

  const handleMemberType = (val) => {
    setNewState({
      ...newState,
      memberType: val,
    });
  };
  const selectedData = (data, obj) => {
    handleMember(obj[0]);
  };
  console.log(props, "props in member composer");
  const handleAdd = () => {
    if (newState.member && newState.memberType) {
      props.handleAdd(newState);
      props.form.setFieldsValue({ members: [], memberType: null });
      setNewState({
        member: [],
        memberType: null,
      });
    } else {
      message.error("Please add member and member type.");
    }
  };

  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <MemberSelect
            data={employees}
            selectedData={selectedData}
            canFetchNow={employees && employees.length > 0}
            fetchData={fetchEmployees}
            placeholder={"Search Members"}
            mode={""}
            isObject={true}
            loadDefaultData={true}
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
            name="members"
            showSearch={true}
            // rules={[
            // 	{
            // 		required: true,
            // 		message: "Please add members",
            // 	},
            // ]}
          />
        </div>
        <div className="memberTypeInput">
          <Form.Item
            name="memberType"
            // rules={[
            // 	{
            // 		required: true,
            // 		message: props.error.type,
            // 	},
            // ]}
          >
            <Select
              placeholder={"Select Type"}
              onChange={handleMemberType}
              style={{
                width: "100%",
                borderRadius: "5px",
              }}
              size="large"
            >
              {DepartmentMemberTypeList().map(({ id, name }) => (
                <Option value={id}>{name}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="">
          <PlusOutlined
            className="ThemeBtn text-xl"
            size="large"
            style={{ borderRadius: 4, border: 0, padding: "10px" }}
            onClick={handleAdd}
          />
        </div>
      </div>
    </>
  );
}

export default MemberComposer;
