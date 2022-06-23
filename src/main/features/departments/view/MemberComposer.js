import React, { useState, useContext } from "react";
import { Button, Form } from "antd";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import Select from "../../../sharedComponents/Select/Select";
import { DepartmentMemberTypeList } from "../constant/index";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import "./style.css";

function MemberComposer(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, departmentDictionary } = departmentDictionaryList[userLanguage];

  const [newState, setNewState] = useState({
    user: {
      id: null,
    },
    memberType: null,
  });

  const handleMember = (val) => {
    const user = JSON.parse(val);
    setNewState({
      ...newState,
      user,
    });
  };

  const handleMemberType = (val) => {
    setNewState({
      ...newState,
      memberType: val,
    });
  };
  const handleAdd = () => {
    if (newState.user && newState.memberType) {
      //   Submit Here
      // After Submit
      props.handleAdd(newState);
      setNewState({
        user: {
          id: null,
        },
        memberType: null,
      });
    } else {
      alert("Please Fill Required Fields");
    }
  };

  const { user } = newState;

  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <Form.Item name="members" showSearch={true} direction={Direction} rules={[{ required: true }]}>
            <NewCustomSelect
              name="members"
              label={"Select Members"}
              showSearch={true}
              onChange={handleMember}
              direction={Direction}
              //   mode="multiple"
              endPoint="api/Reference/GetAllUserReference"
              valueObject={true}
              requestType="get"
              value={user.id}
              defaultValue={user.id}
              placeholder={departmentDictionary.selectMember}
            />
          </Form.Item>
        </div>
        <div className="memberTypeInput">
          <Form.Item
            // initialValue={state.purposeId}
            name="membersType"
            rules={[
              {
                required: true,
                message: "Select Members",
              },
            ]}>
            <Select
              //   value={user.id}
              //   defaultValue={user.id}
              placeholder={"Select Members"}
              data={DepartmentMemberTypeList()}
              onChange={handleMemberType}
              style={{
                width: "100%",
                borderRadius: "5px",
              }}
              size="large"
            />
          </Form.Item>
        </div>

        <div className="">
          <Button className="ThemeBtn" size="large" style={{ borderRadius: 4, border: 0 }} onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
    </>
  );
}

export default MemberComposer;
