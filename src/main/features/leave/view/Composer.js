import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import { addLeave } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getAllLeaveType } from "../leaveType/store/actions";
import { GetLeaveTypeAction } from "../store/actions";
import { getUserLeave } from "../../userLeave/store/actions";
import { useParams } from "react-router-dom";

import { DatePicker, Checkbox, Typography } from "antd";
import { DEFAULT_GUID } from "../../../../utils/constants";
import moment from "moment";
import "./style.css";

import { STRINGS } from "../../../../utils/base";

const { RangePicker } = DatePicker;

const initialState = {
  id: "",
  description: "",
  leaveTypeId: "",
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
  const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];
  const { Option } = Select;
  const { leaveDetail} = useSelector((state) => state.leaveSlice);
  console.log(leaveDetail?.status,"leaveDetailleaveDetail");

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [state, setState] = useState(initialState);
  console.log(state,"state");
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [remaningLeave,setRemainingLeave] = useState("");
  const [value, setValue] = useState([]);
  const { leaveTypes, success } = useSelector((state) => state.leaveTypeSlice);
  console.log(leaveTypes,"leaveTypessss");
  const {leaves} = useSelector((state) => state.leaveSlice);
  const employees = useSelector((state) => state.sharedSlice.employees);
 const { UserLeave, createLoader } = useSelector((state) => state.leaveSlice);
  const [previousGrade, setPreviousGrade] = useState(null);
  const [leavecount,setleavecount] = useState("");
  const { user } = useSelector((state) => state.userSlice);
  const userId = user.id;
  
 // const { id } = useParams();

  console.log(userId,"ididid");
  useEffect(() => {
    dispatch(getUserLeave(userId));
  }, []);

  const { allLeaves } = useSelector((state) => state.userLeaveSlice);
  console.log(allLeaves,"allLeavesallLeaves");
  const [Initialinputs, setInitialinputs] = useState(allLeaves || []);

  useEffect(() => {
    setInitialinputs(allLeaves);
  }, [allLeaves]);

  console.log(Initialinputs,"InitialinputsInitialinputs");

  

  console.log(props, "userIddd");
  const selectedDataApprovers = (data, obj) => {
    setValue(data);
    handleMember(obj);
  };
  const selectedData = (data, obj) => {
    console.log(data, "dataaaaleave");
    setValue(data);
    handleMember(obj);
     setPreviousGrade(obj[0].name === "" ? "Not Available" : obj[0].name);
    // dispatch(getUserLeave(id));
    // setMembers(obj);
    // onChange(data, obj);

    
  };
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  // useEffect(() => {
  //   dispatch(getAllLeaveType());
  // }, []);

 
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

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };
  const handleEndStartDate = (value, dateString, name) => {
    // if (days === 0) {
    //   message.error("select leave date at least for one day! ");
    // } else {
    setState({
      ...state,
      [name]: dateString,
    });
    //}
  };

  
  const onFinish = (values) => {
    var a = moment(values.startEndDate[0]);
    var b = moment(values.startEndDate[1]);
    const days = b.diff(a, "days");

    
    //const days = remaningLeave;
    
    //console.log(remainingdays,"remainingdays");
      
    if (days === 0) {
      message.error("select leave date at least for one day! ");
    } else if (values.members === undefined) {
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

      const payload = {
        ...values,
        approvers,
        members,
        attachments,
        startDate: values.startEndDate[0]._d,
        endDate: values.startEndDate[1]._d,
      };

      console.log(payload,"payloaddd");
      dispatch(addLeave(payload));
    } else {
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

       if(leavecount > 0){
        let remaining = days - leavecount;
        setRemainingLeave(remaining);
       };


      console.log(remaningLeave,"remaningLeave");
      console.log(approvers,"approversss");


      const payload = {
        ...values,
        approvers,
        members,
        days,
        attachments,
        startDate: values.startEndDate[0].format(),
        endDate: values.startEndDate[1].format(),
      };
    
      console.log(payload,"payloadpayload");
      dispatch(addLeave(payload));
    }


    // }
  };
  useEffect(() => {
    if (success) {
      form.resetFields();
    }
  }, [success]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleleaveTypes = (value) => {
    const selectedLeaveType = allLeaves.find((leaveType) => leaveType.id === value);
    const selectedLeaveTypeName = selectedLeaveType ? selectedLeaveType.allocatedLeaves : '';
  
    console.log(selectedLeaveTypeName,"selectedLeaveTypeName");
    setleavecount(selectedLeaveTypeName);
  }

  
  return (
    <>
      <Form
        form={form}
        name="addLeave"
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
          label={leaveDictionary.balanceLeaves}
          name="leaveTypeId"
          rules={[
            {
              required: true,
              message: "Please select leave type",
            },
          ]}
        >
          <Select
            //defaultValue="Annual"
            data={allLeaves}
            placeholder={leaveDictionary.selectType}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
            onChange={handleleaveTypes}
          >
            {allLeaves.map((leave) =>{
              return (
                <>  
                  {leave.leaveType}
                </>
              )
              })}
          </Select>
        </Form.Item>

        <div className="allotedLeaves">
          <h5>{"Allocated Leaves"}: </h5>
          <h5>&nbsp;&nbsp;{leavecount}</h5>
        </div>

        <Form.Item
          name="members"
          label={leaveDictionary.onBehalfOf}
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
            placeholder={leaveDictionary.selectMember}
            // mode={"multiple"}
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
            // rules={[
            //   {
            //     required: true,
            //     message: "Please Select Member",
            //   },
            // ]}
          />
        </Form.Item>

        <Form.Item
          name="approvers"
          label={leaveDictionary.approvers}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: "0px" }}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedDataApprovers}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={leaveDictionary.selectApprovers}
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
          label={leaveDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: leaveDictionary.enterDescription,
            },
          ]}
        >
          <Input.TextArea placeholder={leaveDictionary.enterDescription} />
        </Form.Item>

        <Form.Item label={leaveDictionary.leaveDates} name="startEndDate">
          <RangePicker
            format={"DD/MM/YYYY"}
            placeholder={[leaveDictionary.startDate, leaveDictionary.endDate]}
            onChange={(value, dateString) => {
              handleEndStartDate(value, dateString, "start_end");
            }}
          />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload
            handleImageUpload={(files) =>
              setAttachments(
                files.map((file) => ({
                  file: file.originFileObj,
                  id: STRINGS.DEFAULTS.guid,
                }))
              )
            }
            uploadText={leaveDictionary.upload}
            multiple={true}
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
            title={leaveDictionary.createleave}
          >
            {leaveDictionary.createleave}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
