import { Button, DatePicker, Form, Select } from "antd";
import moment from "moment";
import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import { payrollDictionaryList } from "../../../localization/index";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";

const CreateVoucherOptions = ({ handleChange, data }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
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
          <div>{payrollDictionary.selectMonthYear}</div>
          <DatePicker
            picker="month"
            placeholder={payrollDictionary.selectMonthYear}
            className="w-full"
            defaultValue={moment()}
            onChange={(value) =>
              handleChange({
                ...data,
                month: value._d.getMonth() + 1,
                year: value._d.getFullYear(),
              })
            }
          />
        </div>

        <div className="mr-4 w-[170px]">
          <div>{payrollDictionary.dispereseDate}</div>
          <DatePicker
            placeholder={payrollDictionary.dispereseDate}
            className="w-full"
            value={data.disperseDate}
            onChange={(val) => handleChange({ ...data, disperseDate: val })}
          />
        </div>

        <div className="mr-4 min-w-[250px] max-w-[400px] payrollApprovers">
          <div>{payrollDictionary.approvers}</div>
          <CustomSelect
            data={employeesData}
            selectedData={(value, row) =>
              handleChange({ ...data, approvers: row })
            }
            canFetchNow={employeesData && employeesData.length > 0}
            fetchData={fetchEmployees}
            placeholder={payrollDictionary.approvers}
            mode={"multiple"}
            isObject={true}
            size="small"
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
      </div>
    </div>
  );
};
export default CreateVoucherOptions;
