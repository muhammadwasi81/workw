import { Input, Table, InputNumber, Checkbox, TimePicker } from "antd";
import { useEffect, useState } from "react";
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


const staticDataColumn = [
  {
    name: "Monday",
    isWorking: false,
    checkIn: "2022-02-24T13:00:00.844Z",
    checkOut: "2022-02-24T13:00:00.844Z",
    graceTime: 900,
    dayId: 1,
  },
  {
    name: "Tuesday",
    isWorking: false,
    checkIn: "2022-02-24T13:00:00.844Z",
    checkOut: "2022-02-24T13:00:00.844Z",
    graceTime: 900,
    dayId: 2
  },
  {
    name: "Wednesday",
    isWorking: false,
    checkIn: "2022-02-24T13:00:00.844Z",
    checkOut: "2022-02-24T13:00:00.844Z",
    graceTime: 900,
    dayId: 3
  },
  {
    name: "Thurday",
    isWorking: false,
    checkIn: "2022-02-24T13:00:00.844Z",
    checkOut: "2022-02-24T13:00:00.844Z",
    graceTime: 900,
    dayId: 4
  },
  {
    name: "Friday",
    isWorking: false,
    checkIn: "2022-02-24T13:00:00.844Z",
    checkOut: "2022-02-24T13:00:00.844Z",
    graceTime: 900,
    dayId: 5
  },
  {
    name: "Saturday",
    isWorking: false,
    checkIn: "2022-02-24T13:00:00.844Z",
    checkOut: "2022-02-24T13:00:00.844Z",
    graceTime: 900,
    dayId: 6
  },
  {
    name: "Sunday",
    isWorking: false,
    checkIn: "2022-02-24T13:00:00.844Z",
    checkOut: "2022-02-24T13:00:00.844Z",
    graceTime: 900,
    dayId: 7
  },
]


export default function OfficeTimingForm({ data, onSubmit, loading }) {
  const initialState = { name: "", description: "", details: staticDataColumn };
  const [form, setForm] = useState(initialState);
  // const [timeTable, setTimeTable] = useState(staticDataColumn);


  const handleChangeTable = (e, row, inputType) => {
    let myIndex = row.dayId-1;  
    let oldDetails = [...form.details];

    if (inputType === "isWorking") {
        oldDetails[myIndex] = {...oldDetails[myIndex], isWorking: e.target.checked};  
    } 
    else if (inputType === "graceTime") {
      oldDetails[myIndex] = {...oldDetails[myIndex], graceTime: e};
    }
    else if (inputType === "checkIn") {
        oldDetails[myIndex] = {...oldDetails[myIndex], checkIn: e}
    }
    else if (inputType === "checkOut") {
      oldDetails[myIndex] = {...oldDetails[myIndex], checkOut: e}
    }


    console.log(oldDetails, "old details")


    setForm({ ...form, details: oldDetails })

  }

  const OfficeTimingGroupColumn = [
    {
      title: "Days",
      dataIndex: "name",
      className: "drag-td-name",
      width: "min-content",
      width: "12%",
      editable: true,
      align: 'center'
    },
    {
      title: "Is Working",
      dataIndex: "isWorking",
      className: "drag-td-name",
      width: "min-content",
      width: "10%",
      editable: true,
      align: 'center',
      render: (text, row,) => {
        return <Checkbox
          checked={row.isWorking}
          onChange={(e) => handleChangeTable(e, row, "isWorking")} />
      }
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      className: "drag-td-name",
      width: "min-content",
      width: "15%",
      editable: true,
      align: 'center',
      render: (text, row) => {
        const format = 'HH:mm a';
        const checkInData = moment(row.checkIn, format);
        return (
          <>
            <TimePicker
              defaultValue={checkInData}
              format={format}
              onChange={(e) => handleChangeTable(e, row, "checkIn")}
            />
          </>
        )
      }
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      className: "drag-td-name",
      width: "min-content",
      width: "15%",
      editable: true,
      align: 'center',
      render: (text, row) => {
        const format = 'HH:mm a';
        const checkOutData = moment(row.checkOut, format);
        return (
          <>
            <TimePicker 
              defaultValue={checkOutData}
              format={format}
              onChange={(e) => handleChangeTable(e, row, "checkOut")}
              />
          </>
        )
      }
    },
    {
      title: "Grace Time",
      dataIndex: "graceTime",
      className: "drag-td-name",
      width: "min-content",
      width: "20%",
      editable: true,
      align: 'center',
      render: (text, row) => {
        let graceTime = row.graceTime / 60
        return (
          <>
            <InputNumber 
                min={0} 
                max={100000} 
                defaultValue={graceTime}
                onChange={(e) => handleChangeTable(e, row, "graceTime")}
              />
            min
          </>
        );
      }
    },
  ]
  useEffect(() => {
    // setForm([data, groupData]);

  }, [data]);
  // console.log(form.details, "I'm a Array")
  return (
    <AdminContainer>
      <FormContainer>
        <FormHeader>Office Timings</FormHeader>
        <FormInputContainer>
          <FormInput>
            <FormLabel>Group Name</FormLabel>
            <Input
              placeholder={"Enter Group Name"}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormInput>
          <FormInput>
            <FormLabel>Description</FormLabel>
            <FormTextArea
              placeholder={"Enter Description"}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </FormInput>
        </FormInputContainer>
        <FormButtonContainer>
          {
            form.id ?
              <>
                <FormButton
                  type="primary"
                  size="medium"
                  style={{}}
                  className="formBtn"
                  // onClick={(e) => onSubmit({...form, details:timeTable})}
                  onClick={(e) => console.log(form)}
                >
                  Save Office Timings
                </FormButton>
                <FormButton
                  type="primary"
                  size="medium"
                  style={{}}
                  className="formBtn"
                  onClick={(e) => setForm({ ...form, description: "", name: "" })}
                >
                  Clear
                </FormButton>
              </>
              :
              <FormButton
                type="primary"
                size="medium"
                style={{}}
                className="formBtn"
                onClick={(e) => onSubmit(form)}
              // loading={loading}
              >
                Add Office Timings
              </FormButton>
          }
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
