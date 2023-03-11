import { useEffect, useState } from "react";
import { Button, Avatar, DatePicker, Form, Input, Radio, Select } from "antd";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

import { getAllEmployees } from "../../../../utils/Shared/store/actions";

import { ScheduleTypeEnum } from "../../schedule/enum/enum";
// import { addSchedule } from "../store/action";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { getNameForImage, jsonToFormData } from "../../../../utils/base";
import "../../schedule/styles/style.css";
import { formats, meetingDuration, modules } from "../../schedule/utils";
import { addAppointmentByExternal } from "../projects/store/action";
import { options } from "preact";
function CreateSchedule(
  props,
  { scheduleDetail = {}, referenceType, referenceId }
) {
  const [venue, setVenue] = useState("Venue");
  const [quillError, setQuillError] = useState(false);
  const [files, setFiles] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [subject, setSubject] = useState("");
  const [discription, setDiscription] = useState("");

  console.log(subject, "subject");
  console.log(discription, "discription");
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
    fetchEmployees("", 0);
  }, []);
  console.log(props.durationInMinutes, "durationInMinutes");

  const onFinish = (value) => {
    console.log("onFinish", value);
    let objToSend = value;

    if (objToSend.startDate) {
      objToSend.startDate = moment(objToSend.startDate).format();
    } else {
      objToSend.startDate = defaultValue;
    }
    if (objToSend.startDate) {
      objToSend.endDate = moment(value.startDate)
        .add(+value.endDate.split(" ")[0], value.endDate.split(" ")[1])

        .add(meetingDuration ? meetingDuration : duration, "minutes")

        .format();
      objToSend.startDate = moment(objToSend.startDate).format();
    } else {
      objToSend.endDate = "";
    }

    if (objToSend.members) {
      objToSend.members = value.members.map((member) => {
        return { memberId: member };
      });

      dispatch(addAppointmentByExternal({ createby: userId, ...objToSend }));

      console.log(value, "value");
    }
  };
  console.log(meetingDuration, "meeeeeeeeeeeeeee");
  const onFinishFailed = (value) => {
    if (form.getFieldError("description")[0]) {
      setQuillError(true);
      return;
    }
    setQuillError(false);
  };
  console.log(props.selectedStartTime, "selectedStartTime");
  useEffect(() => {
    if (Object.keys(scheduleDetail).length > 0) {
      console.log("scheduleDetail", scheduleDetail);

      const startD = moment(scheduleDetail.startDate);
      const endD = moment(scheduleDetail.endDate);

      form.setFieldsValue({
        ...scheduleDetail,
        startDate: startD,
        endDate: "gvahsgcx",
        // defaultValue: defaultValue,

        // `${endD.diff(duration, "minutes")} minutes`,
        members: scheduleDetail.members
          .map((members) => {
            return members.memberId;
          })
          .filter((member) => member !== userId),
      });
    }
  }, [scheduleDetail]);
  const defaultValue = moment(props.selectedStartTime, "YYYY-MM-DD HH:mm");
  const duration = props.durationInMinutes;
  console.log(duration, "duration");
  return (
    <div className="createSchedule">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          description: "",
          scheduleType: ScheduleTypeEnum.Meeting,
          endDate: `${duration} min`,
          travelTime: 0,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="subject"
          label={"Subject:"}
          onChange={(e) => setSubject(e.target.value)}
          rules={[{ required: true, message: "Subject is required" }]}
        >
          <Input placeholder="Write Subject"></Input>
        </Form.Item>
        <Form.Item
          name="description"
          label={"Description:"}
          onChange={(e) => {
            setDiscription(e);
          }}
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

        <div className="formInput w-50">
          <Form.Item
            label={"Start Date & Time:"}
            name="startDate"
            rules={[
              {
                required: defaultValue ? false : true,
                message: "Date & Time is required",
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              defaultValue={defaultValue}
              showTime={{ format: "HH:mm" }}
              placeholder="Select Date & Time"
            />
          </Form.Item>
          <Form.Item
            label={"Duration:"}
            name="endDate"
            rules={[{ required: true, message: "Duration is required" }]}
          >
            <Select defaultValue={duration} options={meetingDuration}></Select>
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
