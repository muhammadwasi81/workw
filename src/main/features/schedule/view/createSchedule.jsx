import { useEffect, useState } from "react";
import { Button, Avatar, DatePicker, Form, Input, Radio, Select } from "antd";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

import {
  DeploymentUnitOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { ScheduleTypeEnum } from "../enum/enum";
import { addSchedule } from "../store/action";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { getNameForImage, jsonToFormData } from "../../../../utils/base";
import "../styles/style.css";
import {
  formats,
  meetingDuration,
  modules,
  preparationDuration,
  travelDuration,
} from "../utils";

function CreateSchedule({
  scheduleDetail = {},
  referenceType,
  referenceId,
  date = "",
}) {
  const [venue, setVenue] = useState("Venue");
  const [quillError, setQuillError] = useState(false);
  const [files, setFiles] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const userId = useSelector((state) => state.userSlice.user.id);
  const loading = useSelector((state) => state.scheduleSlice.loading);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (date) {
      // const startD = moment(scheduleDetail.startDate)
      form.setFieldsValue({
        startDate: moment(date),
      });
    }
  }, [date]);

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const onFinish = (value) => {
    console.log("onFinish", value);
    let objToSend = value;
    if (objToSend.startDate) {
      objToSend.endDate = moment(value.startDate)
        .add(+value.endDate.split(" ")[0], value.endDate.split(" ")[1])
        .format();
      objToSend.startDate = moment(objToSend.startDate).format();
    } else {
      objToSend.endDate = "";
    }
    if (objToSend.members) {
      objToSend.members = value.members.map((member) => {
        return { memberId: member };
      });
    }
    let attachments;
    if (files.length > 0) {
      attachments = files.map((file) => {
        return {
          id: defaultUiid,
          file: file.originFileObj,
        };
      });
    }

    if (venue !== "Venue") {
      objToSend.onVideoConference = true;
    }

    dispatch(
      addSchedule(
        jsonToFormData({
          ...objToSend,
          attachments,
          referenceType: referenceType,
          referenceId: referenceId,
        })
      )
    );
  };
  const onFinishFailed = (value) => {
    // console.log('field validating', form.getFieldError("description")[0]);
    if (form.getFieldError("description")[0]) {
      setQuillError(true);
      return;
    }
    setQuillError(false);
    // if (
    // 	value.values.description.replace(/<(.|\n)*?>/g, "").trim()
    // 		.length === 0
    // ) {
    // 	form.setFieldsValue({
    // 		description: "",
    // 	});
    // }
  };

  useEffect(() => {
    if (Object.keys(scheduleDetail).length > 0) {
      console.log("scheduleDetail", scheduleDetail);
      const startD = moment(scheduleDetail.startDate);
      const endD = moment(scheduleDetail.endDate);
      form.setFieldsValue({
        ...scheduleDetail,
        startDate: startD,
        endDate: `${endD.diff(startD, "minutes")} minutes`,
        members: scheduleDetail.members
          .map((members) => {
            return members.memberId;
          })
          .filter((member) => member !== userId),
      });
    }
  }, [scheduleDetail]);

  console.log(moment(), "momentt");

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current.isBefore(moment().subtract(1, "day"));
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  function disabledHours() {
    // Disable past hours
    const currentHour = moment().hour();
    return [...Array(currentHour).keys()];
  }

  function disabledMinutes(selectedHour) {
    // Disable past minutes for the selected hour
    const currentMinute = moment().minute();
    return selectedHour < moment().hour()
      ? []
      : [...Array(currentMinute).keys()];
  }
  return (
    <div className="createSchedule">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          description: "",
          location: "",
          scheduleType: ScheduleTypeEnum.Meeting,
          endDate: "15 minutes",
          onVideoConference: false,
          travelTime: 0,
          preparationTime: 0,
          members: [],
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="subject"
          label={"Subject:"}
          rules={[{ required: true, message: "Subject is required" }]}
        >
          <Input placeholder="Write Subject"></Input>
        </Form.Item>
        <Form.Item
          name="description"
          label={"Description:"}
          rules={[
            {
              required: true,
              message: "Description is required",
              // validator: checkDesc,
            },
          ]}
        >
          <ReactQuill
            className={`${
              quillError
                ? "ant-input ant-input-status-error !p-0"
                : "ReactQuill "
            } `}
            onChange={(e) => {
              if (e.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
                form.setFieldsValue({
                  description: "",
                });
                setQuillError(true);
                return;
              }
              if (quillError) {
                setQuillError(false);
              }
            }}
            modules={modules}
            formats={formats}
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item label="Type:" name={"scheduleType"}>
          <Radio.Group>
            <Radio.Button value={ScheduleTypeEnum.Meeting}>
              <DeploymentUnitOutlined />
              Meeting
            </Radio.Button>
            <Radio.Button value={ScheduleTypeEnum.Appointment}>
              <CalendarOutlined />
              Appointment
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Location:">
          <Radio.Group
            onChange={(e) => {
              setVenue(e.target.value);
            }}
            defaultValue={venue}
          >
            <Radio.Button value="Venue">
              <EnvironmentOutlined />
              Venue
            </Radio.Button>
            <Radio.Button value="Workwise">
              <VideoCameraOutlined />
              Workwise
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {venue === "Venue" && (
          <Form.Item label={"Venue:"} name="location">
            <Input placeholder="Enter the Location" />
          </Form.Item>
        )}
        <div className="formInput w-50">
          <Form.Item
            label={"Start Date & Time:"}
            name="startDate"
            rules={[
              {
                required: true,
                message: "Date & Time is required",
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              disabledHours={disabledHours}
              disabledMinutes={disabledMinutes}
              // disabledTime={(current) => current.isBefore(moment())}
              // disabledTime={disabledDateTime}
              showTime={{
                defaultValue: moment("00:00:00", "HH:mm"),
              }}
              placeholder="Select Date & Time"
            />
          </Form.Item>
          <Form.Item
            label={"Duration:"}
            name="endDate"
            rules={[{ required: true, message: "Duration is required" }]}
          >
            <Select defaultValue="15min" options={meetingDuration}></Select>
          </Form.Item>
        </div>

        <Form.Item
          name={"externals"}
          label={"External Members"}
          //   direction={Direction}
        >
          <Select
            mode="tags"
            dropdownClassName="hidden"
            placeholder={"Enter the Email Address"}
            size="large"
          />
        </Form.Item>
        <MemberSelect
          isObject={true}
          data={firstTimeEmpData}
          selectedData={(data, obj) => {}}
          canFetchNow={isFirstTimeDataLoaded}
          fetchData={fetchEmployees}
          name="members"
          mode="multiple"
          placeholder={"Select Employee"}
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
          label={"Members"}
          size="default"
        />

        <div className="formInput w-50">
          {/* <Form.Item label={""}>
						<Checkbox>Travel Time</Checkbox>
					</Form.Item> */}
          <Form.Item label={"Travel Time:"} name="travelTime">
            <Select defaultValue={0} options={travelDuration}></Select>
          </Form.Item>
          <Form.Item label={"Preparation Time:"} name="preparationTime">
            <Select defaultValue={0} options={preparationDuration}></Select>
          </Form.Item>
        </div>
        {/* <div className="formInput w-33">
					<Form.Item label={""}>
						<Checkbox>Preparation time</Checkbox>
					</Form.Item>
				</div> */}
        <Form.Item label={"Attachment"} labelPosition="top">
          <SingleUpload
            handleImageUpload={(file) => {
              // console.log(file);
              setFiles(file);
              // setFile(file[0].originFileObj);
            }}
            multiple={true}
            position={"left"}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="ThemeBtn"
            block
            htmlType="submit"
            loading={loading}
          >
            {"Create Schedule"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateSchedule;
