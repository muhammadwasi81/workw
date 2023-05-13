import { useEffect, useState } from "react";
import { Button, Avatar, DatePicker, Form, Input, Radio, Select } from "antd";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

import { getAllEmployees } from "../../../../utils/Shared/store/actions";

import { ScheduleTypeEnum } from "../../schedule/enum/enum";

import "../../schedule/styles/style.css";
import { formats, meetingDuration, modules } from "../../schedule/utils";
import { addAppointmentByExternal } from "./store/action";
import { closeModal } from "./store/slice";

function CreateSchedule(
  props,
  { scheduleDetail = {}, referenceType, referenceId }
) {
  const [quillError, setQuillError] = useState(false);
  const [subject, setSubject] = useState("");
  const [discription, setDiscription] = useState("");
  const [internalDuration, setInternalDuration] = useState();

  let userId = props.id;

  // const userId = useSelector((state) => state.userSlice.user.id);
  const { loader } = useSelector((state) => state.externalBookAppointment);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinishFailed = (value) => {
    if (form.getFieldError("description")[0]) {
      setQuillError(true);
      return;
    }
    setQuillError(false);
  };
  const onFinish = (value, props) => {
    let objToSend = value;
    // objToSend = [value.externals.id];
    objToSend.createBy = "42714b44-f73b-4607-9b0d-30a30b3e2c7f";
    objToSend.externals = [{ externals: value.externals }];
    objToSend.members = [{ memberId: userId }];
    if (objToSend.startDate) {
      objToSend.startDate = moment(objToSend.startDate)
        .utc()
        .format(); // convert start date to UTC format
    } else {
      objToSend.startDate = defaultValue;
    }

    if (objToSend.startDate) {
      objToSend.endDate = moment(value.startDate)
        .add(+value.endDate.split(" ")[0], value.endDate.split(" ")[1])
        .add(internalDuration ? internalDuration : duration, "minutes")
        .utc() // convert end date to UTC format
        .format();
      objToSend.startDate = moment(objToSend.startDate)
        .utc()
        .format();
    } else {
      objToSend.endDate = "";
    }

    const payload = {
      data: objToSend,
      id: userId,
    };
    dispatch(addAppointmentByExternal(payload));

    dispatch(closeModal(false));
  };

  useEffect(() => {
    if (Object.keys(scheduleDetail).length > 0) {
      const startD = moment(scheduleDetail.startDate);
      const endD = moment(scheduleDetail.endDate);

      form.setFieldsValue({
        ...scheduleDetail,
        startDate: startD,
        endDate: "gvahsgcx",
      });
    }
  }, [scheduleDetail]);
  const defaultValue = moment(props.selectedStartTime, "YYYY-MM-DD HH:mm");
  const duration = props.durationInMinutes.toString();

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
          name="externals"
          label={"Email:"}
          //   direction={Direction}
          rules={[
            {
              required: true,
              message: "Email is required",
              type: "email",
            },
          ]}
        >
          <Input placeholder={"Enter the Email Address"} />
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
              utc={true}
            />
          </Form.Item>
          <Form.Item
            label={"Duration:"}
            name="endDate"
            rules={[{ required: true, message: "Duration is required" }]}
          >
            <Select
              name={internalDuration}
              onSelect={(e) => setInternalDuration(e)}
              defaultValue={duration}
              options={meetingDuration}
            ></Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="ThemeBtn"
            block
            htmlType="submit"
            loading={loader ? true : false}
          >
            {"Create Schedule"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateSchedule;
