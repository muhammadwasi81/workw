import { Input, Table, InputNumber, Checkbox, TimePicker, message } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import moment from "moment";
import "./officeTiming.css";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { useDispatch, useSelector } from "react-redux";

const secondsToHms = (d) => {
  d = Number(d);
  console.log(d, "ddd");

  var h = Math.floor(d / 3600);
  console.log(h, "hhhhh");
  var m = Math.floor((d % 3600) / 60);
  console.log(m, "mmmmm");
  var s = Math.floor((d % 3600) % 60);
  console.log(s, "ssss");
  // var p = 0;
  // var ap = "a";
  // if (h > 12) {
  //   p = h - 2;
  //   ap = "p";
  // }

  var hDisplay = h > 0 ? String(h).padStart(2, "0") : "00";
  var mDisplay = m > 0 ? String(m).padStart(2, "0") : "00";
  var sDisplay = s > 0 ? String(s).padStart(2, "0") : "00";
  return hDisplay + ":" + mDisplay + ":" + sDisplay;
};

var startTime = secondsToHms(32400);
var endTime = secondsToHms(61200);
let defaultStartTime = 32400;
let defaultEndTime = 61200;

// var startTime = 100;
// var endTime = 100;
const staticDataColumn = [
  {
    name: "Monday",
    isWorking: false,
    checkIn: defaultStartTime,
    checkOut: defaultEndTime,
    graceTime: 900,
    dayId: 1,
  },
  {
    name: "Tuesday",
    isWorking: false,
    checkIn: defaultStartTime,
    checkOut: defaultEndTime,
    graceTime: 900,
    dayId: 2,
  },
  {
    name: "Wednesday",
    isWorking: false,
    checkIn: defaultStartTime,
    checkOut: defaultEndTime,
    graceTime: 900,
    dayId: 3,
  },
  {
    name: "Thurday",
    isWorking: false,
    checkIn: defaultStartTime,
    checkOut: defaultEndTime,
    graceTime: 900,
    dayId: 4,
  },
  {
    name: "Friday",
    isWorking: false,
    checkIn: defaultStartTime,
    checkOut: defaultEndTime,
    graceTime: 900,
    dayId: 5,
  },
  {
    name: "Saturday",
    isWorking: false,
    checkIn: defaultStartTime,
    checkOut: defaultEndTime,
    graceTime: 900,
    dayId: 6,
  },
  {
    name: "Sunday",
    isWorking: false,
    checkIn: defaultStartTime,
    checkOut: defaultEndTime,
    graceTime: 900,
    dayId: 7,
  },
];

export default function OfficeTimingForm({
  data,
  onSubmit,
  loading,
  isEdited,
  editData,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, office, Direction } = dictionaryList[userLanguage];
  const initialState = {
    id: editData?.id,
    name: editData?.name,
    description: editData?.description,
    details: staticDataColumn,
  };
  const [form, setForm] = useState(initialState);

  const { officeTimingDetail } = useSelector(
    (state) => state.officeTimingSlice
  );
  // useEffect(() => {
  //   if (Object.keys(formData).length) {
  //     setForm(formData[0]);
  //     console.log(formData[0], "formmm dataaa");
  //   }
  // }, [formData]);

  const handleChangeTable = (e, row, inputType) => {
    let myIndex = row.dayId - 1;
    let oldDetails = [...form.details];

    if (inputType === "isWorking") {
      oldDetails[myIndex] = {
        ...oldDetails[myIndex],
        isWorking: e.target.checked,
      };
    } else if (inputType === "graceTime") {
      oldDetails[myIndex] = {
        ...oldDetails[myIndex],
        graceTime: e,
      };
    } else if (inputType === "checkIn") {
      oldDetails[myIndex] = {
        ...oldDetails[myIndex],
        checkIn: e._d.getMinutes() * 60 + e._d.getHours() * 3600,
      };
    } else if (inputType === "checkOut") {
      oldDetails[myIndex] = {
        ...oldDetails[myIndex],
        checkOut: e._d.getMinutes() * 60 + e._d.getHours() * 3600,
      };
    }

    setForm({ ...form, details: oldDetails });
  };

  const OfficeTimingGroupColumn = [
    {
      title: administration.office.days,
      dataIndex: "name",
      className: "drag-td-name",
      width: "min-content",
      width: "12%",
      editable: true,
      align: "center",
    },
    {
      title: administration.office.work,
      dataIndex: "isWorking",
      className: "drag-td-name",
      width: "min-content",
      width: "10%",
      editable: true,
      align: "center",
      render: (text, row) => {
        return (
          <Checkbox
            checked={row.isWorking}
            onChange={(e) => handleChangeTable(e, row, "isWorking")}
          />
        );
      },
    },
    {
      title: administration.office.checkIn,
      dataIndex: "checkIn",
      className: "drag-td-name",
      width: "min-content",
      width: "15%",
      editable: true,
      align: "center",
      render: (text, row) => {
        const format = "HH:mm a";

        // const checkInData = moment(secondsToHms(row.checkIn), format);
        // console.log(checkInData, "checkIn data");
        // console.log(Number(row.checkIn), "row.checkinnnn");
        // console.log(moment(row.checkIn).format(), "heeeee");
        // moment(row.checkIn, "HH:mm:ss: A").diff(
        //   moment().startOf("day"),
        //   "seconds"
        // );
        // console.log(checkInData, "checkInData");

        // const checkInData = moment.duration(row.checkIn).asSeconds(); //mm:ss to seconds
        // console.log(checkInData, "myVarrr");

        const defaultDate = moment(row.checkIn, format);

        return (
          <>
            <TimePicker
              defaultValue={defaultDate}
              format={format}
              onChange={(e) => handleChangeTable(e, row, "checkIn")}
            />
          </>
        );
      },
    },
    {
      title: administration.office.checkOut,
      dataIndex: "checkOut",
      className: "drag-td-name",
      width: "min-content",
      width: "15%",
      editable: true,
      align: "center",
      render: (text, row) => {
        const format = "HH:mm a";
        const checkOutData = moment(row.checkOut, format);
        return (
          <>
            <TimePicker
              defaultValue={checkOutData}
              format={format}
              onChange={(e) => handleChangeTable(e, row, "checkOut")}
            />
          </>
        );
      },
    },
    {
      title: administration.office.time,
      dataIndex: "graceTime",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: "center",
      render: (text, row) => {
        let graceTime = row.graceTime / 60;
        console.log(graceTime, "graceTime");
        return (
          <>
            <InputNumber
              min={0}
              max={100000}
              defaultValue={graceTime}
              onChange={(e) => handleChangeTable(e, row, "graceTime")}
            />
            {administration.office.min}
          </>
        );
      },
    },
  ];
  useEffect(() => {
    // setForm([data, groupData]);
  }, [data]);
  // console.log(form.details, "I'm a Array")
  const { loader } = useSelector((state) => state.officeTimingSlice);
  return (
    <AdminContainer>
      <FormContainer>
        <FormHeader>{administration.office.Office_Timing}</FormHeader>
        <FormInputContainer>
          <FormInput>
            <FormLabel>{administration.office.group}</FormLabel>
            <Input
              placeholder={administration.office.enterGroup}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormInput>
          <FormInput>
            <FormLabel>{administration.office.description}</FormLabel>
            <FormTextArea
              placeholder={administration.office.enterDescription}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </FormInput>
        </FormInputContainer>
        <FormButtonContainer>
          {/* {form.id ? (
            <>
              <FormButton
                type="primary"
                size="medium"
                style={{}}
                className="formBtn"
                // onClick={(e) => onSubmit({ ...form, details: timeTable })}
                onClick={(e) => console.log(form)}
                loading={loader}
              >
                {"Update"}
              </FormButton>
              <FormButton
                type="primary"
                size="medium"
                style={{}}
                className="formBtn"
                onClick={(e) => setForm({ ...form, description: "", name: "" })}
              >
                {administration.office.clear}
              </FormButton>
            </>
          ) : (
            <FormButton
              type="primary"
              size="medium"
              style={{}}
              className="formBtn"
              onClick={(e) => onSubmit(form)}
              loading={loader}
            >
              {administration.office.Add}
            </FormButton>
          )} */}
          <FormButton
            type="primary"
            size="medium"
            className="ThemeBtn"
            htmlType="submit"
            title={"Create"}
            // loading={createLoader}
            onClick={(e) => onSubmit(form)}
          >
            {" "}
            {editData ? "Update Office Timing" : "Create Office Timing"}{" "}
          </FormButton>
        </FormButtonContainer>
      </FormContainer>
      <Table
        style={{ marginTop: 20 }}
        pagination={false}
        size="middle"
        columns={OfficeTimingGroupColumn}
        dataSource={form.details}
      />
    </AdminContainer>
  );
}
