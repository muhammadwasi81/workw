import React, { useEffect, useState } from "react";
import TeamCard, { CardGrid } from "../../team/view/TeamCard";
import { useSelector, useDispatch } from "react-redux";
import { Form, Select, Avatar, Skeleton } from "antd";
import { getallEmployee } from "../../../../utils/Shared/store/actions";
import { getNameForImage } from "../../../../utils/base";
import { useParams } from "react-router-dom";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
import { addEmployeeLink, getAllEmployeeLink } from "../store/actions";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import EmployeeLinkageCard from "./EmployeeLinkageCard";

const { Option } = Select;

const EmployeeLinkage = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const [form] = Form.useForm();
  const [employeesData, setEmployeesData] = useState([]);
  const { teams } = useSelector((state) => state.teamSlice);
  const { employeeLink } = useSelector((state) => state.employeeSlice.employee);

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

  useEffect(() => {
    if (employees.length > 0) {
      setEmployeesData(employees);
    }
  }, [employees]);

  useEffect(() => {
    fetchEmployees("", 0);
    dispatch(getAllEmployeeLink(param.id));
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const handleOnSelect = (val) => {
    console.log(val, "val");
    //TODO: here we will add employess
    let payload = {
      userId: param.id,
      data: [{ linkUserId: val }],
    };
    console.log(payload, "payload to send data ");
    dispatch(addEmployeeLink(payload));
  };

  return (
    <>
      <span className="text-xl font-bold">Add Employees Linkage</span>
      <Form.Item
        name="assign"
        rules={[
          {
            required: true,
            message: "Please Select Assign Member!",
          },
        ]}
      >
        <Select
          mode="multiple"
          name="assign"
          size="large"
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder={"Add"}
          onSelect={handleOnSelect}
          onDeselect={(value) => {
            let memberArr = [...employeesData];
            memberArr = memberArr.filter((item) => item.id !== value);
            setEmployeesData(memberArr);
            form.setFieldValue("assign", memberArr);
          }}
        >
          {employeesData.map((item, index) => {
            return (
              <Option
                key={item?.id}
                value={item?.id}
                className="hover:!bg-primary-color hover:!text-white"
              >
                <Avatar src={item?.image} className="!bg-black flex !mr-1">
                  {getNameForImage(item?.name)}
                </Avatar>

                {item?.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      {employeeLink.length === 0 ? (
        <NoDataFound />
      ) : (
        <>
          <div style={{ flexDirection: "column", width: "100%" }}>
            <CardGrid>
              {employeeLink.map((item, index) => {
                return (
                  <EmployeeLinkageCard employeeLinkage={item} key={index} />
                );
              })}
            </CardGrid>
          </div>
        </>
      )}
    </>
  );
};
export default EmployeeLinkage;
