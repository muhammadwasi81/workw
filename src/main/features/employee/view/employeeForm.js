import { DatePicker, Input, Select } from "antd";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "../Styles/employee.style";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
// import { getCities } from "../../../../utils/Shared/store/actions";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
// import CustomScrollSelect from "../../../sharedComponents/ScrollSelect/customScrollSelect";
import { getCitiesService } from "../../../../utils/Shared/services/services";
// import useSearch from "./useSearch";
import NewCustomSelect from "./newCustomSelect";
import { userType, userTitle } from "../../../../utils/Shared/enums/enums";
// import ScrollSelect from "../../../sharedComponents/ScrollSelect/scrollSelect";
//import { Select as SelectBox } from "../../../sharedComponents/Select/Select";

const { Option } = Select;

const EmployeeForm = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityData, setCityData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [searching, setSearching] = useState(false);
  const [userTypeValue, setUserTypeValue] = useState("");
  // const userTypeSelectRef = useRef("");
  // console.log("userTypeSelectRef", userTypeSelectRef.current.value);

  const {
    countries,
    designations,
    genders,
    maritalStatus,
    userTitles,
    employeeTypes,
  } = useSelector((state) => state.sharedSlice);
  const { grades } = useSelector((state) => state.gradeSlice);
  const { officeTimingGroups } = useSelector(
    (state) => state.officeTimingSlice
  );
  const { accessRoles } = useSelector((state) => state.accessRolesSlice);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      getCitiesService({
        textData: debouncedSearchTerm,
        page: counter,
      }).then((res) => {
        if (res.message === "success") {
          setCityData([...res.data]);
        }
        setSearching(false);
      });
    }
  }, [debouncedSearchTerm, counter]);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { employees, Direction } = dictionaryList[userLanguage];
  const value = employees.EmployeeForm;
  const placeholder = employees.placeholders;
  const selectBefore = (
    <S.FormItem name="titleId" className="formItem_userTitle">
      <Select size="large" style={{ padding: "0", width: "4rem" }}>
        {userTitle.map((titles) => (
          <Option value={titles.id}>{titles.name}</Option>
        ))}
      </Select>
    </S.FormItem>
  );

  return (
    <>
      <S.BasicForm className="employeeForm" direction={Direction}>
        <S.FormItem area="true">
          <SingleUpload
            handleImageUpload={props.handleImageUpload}
            uploadText={value.AddImage}
            multiple={false}
          />
        </S.FormItem>

        <S.FormItem
          direction={Direction}
          name="firstName"
          label={value.FirstName}
          rules={[{ required: true }]}
        >
          <Input
            size="large"
            addonBefore={selectBefore}
            placeholder={placeholder.fName}
          />
        </S.FormItem>
        <S.FormItem
          name="lastName"
          label={value.LastName}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder={placeholder.lName} size="large" />
        </S.FormItem>
        <S.FormItem
          name="fatherName"
          label={value.FatherName}
          direction={Direction}
        >
          <Input placeholder={placeholder.fatherName} size="large" />
        </S.FormItem>

        <S.FormItem
          name="email"
          label={value.Email}
          rules={[{ required: true }, { type: "email" }]}
          direction={Direction}
        >
          <Input placeholder={placeholder.email} size="large" />
        </S.FormItem>

        <S.FormItem
          name="personalEmail"
          label={value.PersonalEmail}
          rules={[{ required: true }, { type: "email" }]}
          direction={Direction}
        >
          <Input placeholder={placeholder.pEmail} size="large" />
        </S.FormItem>
        <S.FormItem
          name="phoneNo"
          label={value.PhoneNumber}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder={placeholder.phNo} size="large" />
        </S.FormItem>

        <S.FormItem
          name="residentialAddress"
          label={value.rAddress}
          rules={[{ required: true }]}
          direction={Direction}
          addressArea={true}
          className="residentialAddress"
        >
          <Input placeholder={placeholder.rAddress} size="large" />
        </S.FormItem>
        <S.FormItem
          name="permanentAddress"
          label={value.pAddress}
          rules={[{ required: true }]}
          direction={Direction}
          addressArea={true}
          className="permenantAddress"
        >
          <Input placeholder={placeholder.pAddress} size="large" />
        </S.FormItem>
        <S.FormItem
          name="nic"
          label={value.CNICNumber}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder={placeholder.cnicNo} size="large" />
        </S.FormItem>
        <S.FormItem
          name="designationId"
          label={value.Designation}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            size="large"
            showSearch
            placeholder={placeholder.searchToSelect}
            optionFilterProp="children"
            // filterOption={handleFilterOption}
            // filterSort={handleFilterSort}
          >
            {designations &&
              designations.length > 0 &&
              designations.map((designation) => (
                <Option value={designation.id}>{designation.name}</Option>
              ))}
          </Select>
        </S.FormItem>
        <S.FormItem
          name="managerId"
          label={value.Manager}
          // rules={[{ required: true }]}
          direction={Direction}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch
            size="large"
            placeholder={placeholder.searchToSelect}
            optionFilterProp="children"
            // filterOption={handleFilterOption}
            // filterSort={handleFilterSort}
          >
            <Option value={1}>Amir</Option>
            <Option value={2}>Owais</Option>
          </Select>
        </S.FormItem>
        <S.FormItem
          name="gradeId"
          label={value.Grades}
          // rules={[{ required: true }]}
          direction={Direction}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch
            size="large"
            placeholder={placeholder.searchToSelect}
            optionFilterProp="children"
            // filterOption={handleFilterOption}
            // filterSort={handleFilterSort}
          >
            {grades &&
              grades.length > 0 &&
              grades.map((grade) => (
                <Option value={grade.id}>{grade.name}</Option>
              ))}
          </Select>
        </S.FormItem>

        <S.FormItem
          name="countryId"
          label={value.Country}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch
            size="large"
            placeholder={placeholder.searchToSelect}
            optionFilterProp="children"
          >
            {countries &&
              countries.length > 0 &&
              countries.map((country) => (
                <Option value={country.id}>{country.name}</Option>
              ))}
          </Select>
        </S.FormItem>
        <S.FormItem
          name="cityId"
          label={value.City}
          direction={Direction}
          rules={[{ required: true }]}
        >
          <NewCustomSelect
            name="cityId"
            label={value.City}
            showSearch={true}
            direction={Direction}
            endPoint="GetAllCities"
            requestType="post"
            placeholder={placeholder.searchToSelect}
          />
        </S.FormItem>

        <S.FormItem
          name="probationPeriod"
          label={value.ProbationPeriod}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input
            placeholder={placeholder.probPeriod}
            size="large"
            type={"number"}
            min={1}
            step={"1"}
          />
        </S.FormItem>
        <S.FormItem
          name="noticePeriod"
          label={value.NoticePeriod}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input
            placeholder={placeholder.noticePeriod}
            size="large"
            type={"number"}
            min={1}
            step={"1"}
          />
        </S.FormItem>
        <S.FormItem
          name="birthDate"
          label={value.DateOfBirth}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <DatePicker
            placeholder={placeholder.selectDate}
            size="large"
            format={"DD/MM/YYYY"}
            getPopupContainer={(trigger) => trigger.parentNode}
          />
        </S.FormItem>
        <S.FormItem
          name="joinDate"
          label={value.DateOfJoining}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <DatePicker
            placeholder={placeholder.selectDate}
            size="large"
            format={"DD/MM/YYYY"}
            getPopupContainer={(trigger) => trigger.parentNode}
          />
        </S.FormItem>
        <S.FormItem
          name="genderId"
          label={value.Gender}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect
            size="large"
            placeholder={placeholder.selectGender}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {genders &&
              genders.length > 0 &&
              genders.map((gender) => (
                <Option value={gender.id}>{gender.name}</Option>
              ))}
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="maritalStatusId"
          label={value.MaritalStatus}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect
            size="large"
            placeholder={placeholder.selectMarital}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {maritalStatus &&
              maritalStatus.length > 0 &&
              maritalStatus.map((status) => (
                <Option value={status.id}>{status.name}</Option>
              ))}
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="officeTimingId"
          label={value.OfficeShift}
          // rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect
            size="large"
            placeholder={placeholder.selectShift}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {officeTimingGroups &&
              officeTimingGroups.length > 0 &&
              officeTimingGroups.map((timing) => (
                <Option value={timing.id}>{timing.name}</Option>
              ))}
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="employeeNo"
          label={value.EmpNo}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder={placeholder.empNo} size="large" />
        </S.FormItem>
        <S.FormItem
          name="employmentTypeId"
          label={value.EmploymentType}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.empType}
          >
            {employeeTypes &&
              employeeTypes.length > 0 &&
              employeeTypes.map((employee) => (
                <Option value={employee.id}>{employee.name}</Option>
              ))}
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="userTypeId"
          rules={[{ required: true }]}
          direction={Direction}
          label={value.UserType}
        >
          <S.CustomSelect
            size="large"
            placeholder={placeholder.selectUserType}
            getPopupContainer={(trigger) => trigger.parentNode}
            onChange={(values) => {
              setUserTypeValue(values);
            }}
          >
            {userType.map((type) => (
              <Option value={type.id}>{type.name}</Option>
            ))}
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="accessRoleId"
          rules={[{ required: true }]}
          direction={Direction}
          label={value.AccessRole}
        >
          <S.CustomSelect
            size="large"
            placeholder={placeholder.selectAccessRole}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {accessRoles &&
              accessRoles.length > 0 &&
              accessRoles
                .filter(function (el) {
                  if (el.roleTypeId === userTypeValue) {
                    return el;
                  }
                })
                .map((type) => <Option value={type.id}>{type.name}</Option>)}
          </S.CustomSelect>
        </S.FormItem>
      </S.BasicForm>
    </>
  );
};

export default EmployeeForm;
