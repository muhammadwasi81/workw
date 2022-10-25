import { Button, DatePicker, Form, Select, Input, InputNumber } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";

const CreateQuotationOptions = ({ handleChange, data }) => {
  const dispatch = useDispatch();
  const employeesData = useSelector((state) => state.sharedSlice.employees);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = (text = "", pgNo = 1) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  return (
    <div className="flex justify-between items-center my-2 bg-white px-4 py-2 rounded-md">
      <div className="flex justify-between items-center">
        <div className="mr-4  w-[170px]">
          <Input
            placeholder="Client Name"
            onChange={(e) => handleChange({ ...data, name: e.target.value })}
            required={true}
          />
        </div>

        <div className="mr-4 w-[170px]">
          <Input
            placeholder="client@gmail.com"
            rules={[{ type: "email" }]}
            onChange={(e) => handleChange({ ...data, email: e.target.value })}
          />
        </div>

        <div className="mr-4 w-[170px]">
          <Input
            placeholder="Phone Number"
            //  rules={[{ type: "number" }]}
            onChange={(e) =>
              handleChange({ ...data, phoneNumber: e.target.value })
            }
          />
        </div>
        <div className="mr-4 w-[170px]">
          <CustomSelect
            data={employeesData}
            style={{ height: "2rem" }}
            selectedData={(value, row) =>
              handleChange({
                ...data,
                approvers: row.map((el, i) => {
                  return {
                    approverId: el.id,
                    email: el.email,
                    approverType: 0,
                  };
                }),
              })
            }
            canFetchNow={employeesData && employeesData.length > 0}
            fetchData={fetchEmployees}
            placeholder={"Approvers"}
            mode={"multiple"}
            isObject={true}
            size="medium"
            loadDefaultData={false}
            formItem={false}
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
            dataVal={[]}
            name="approvers"
            showSearch={true}
          />
        </div>
        <div className="mr-4 w-[170px]">
          <DatePicker
            className="w-full"
            locale="locale"
            // onChange={(value, dateString) =>
            //   handleChange({
            //     ...data,
            //     quotationDate: value._d.constructor(),
            //   })
            // }
            onChange={(value) =>
              handleChange({ ...data, quotationDate: value })
            }
          />
        </div>
      </div>
    </div>
  );
};
export default CreateQuotationOptions;
