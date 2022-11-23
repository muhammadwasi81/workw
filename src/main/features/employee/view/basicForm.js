import { Button, DatePicker, Divider, Form, Input, Select, Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { employeeDictionaryList } from "../localization/index";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { EditOutlined } from "@ant-design/icons";
import {
  userType,
  userTitle,
  genderList,
  maritalStatusList,
  employmentType,
} from "../../../../utils/Shared/enums/enums";
import { useDispatch } from "react-redux";
import {
  getAllEmployees,
  getCities,
  getCountries,
} from "../../../../utils/Shared/store/actions";
import { getAllGrades } from "../../grade/store/actions";
import { getAllDepartmentService } from "../../departments/services/service";
import { getAllAccessRoles } from "../../accessRole/store/action";
import { getAllOfficeTimingGroups } from "../../officeTimings/store/actions";
import { getUserBasicInfo } from "../../basicInfo/store/actions";
import moment from "moment";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getNameForImage, STRINGS } from "../../../../utils/base";
import CitySelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/CitySelect";
import { resetBasicdetails } from "../store/slice";
import { getAllDesignation } from "../../designation/store/actions";
const { Option } = Select;

const BasicInfo = ({ mode, profileImage, handleImageUpload, id }) => {
  const isEdit = mode === "edit";
  const [form] = Form.useForm();

  const initialState = {
    coverImageId: "",
    userTypeId: "",
    titleId: 1,
    firstName: "",
    lastName: "",
    fatherName: "",
    email: "",
    personalEmail: "",
    nic: "",
    phoneNo: "",
    designationId: [],
    managerId: [],
    gradeId: [],
    countryId: [],
    cityId: [],
    probationPeriod: "",
    birthDate: "",
    joinDate: "",
    genderId: [],
    maritalStatusId: [],
    officeTimingId: [],
    accessRoleId: [],
    employeeNo: [],
    employmentTypeId: [],
  };
  const [department, setDepartment] = useState([]);
  const [initialValues, setInitialValues] = useState(initialState);
  const [userTypeValue, setUserTypeValue] = useState([]);
  const { countries, cities } = useSelector((state) => state.sharedSlice);
  const { designations } = useSelector((state) => state.designationSlice);
  const { grades } = useSelector((state) => state.gradeSlice);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const { officeTimingGroups } = useSelector(
    (state) => state.officeTimingSlice
  );
  const dispatch = useDispatch();
  const { accessRoles } = useSelector((state) => state.accessRolesSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employeesDictionary, Direction } = employeeDictionaryList[
    userLanguage
  ];

  console.log(designations, "DESIGNATION");

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);
  const {
    employee: { basicdetails },
  } = useSelector((state) => state.employeeSlice);
  const labels = employeesDictionary.EmployeeForm;
  const placeholder = employeesDictionary.placeholders;

  const getDepartment = async () => {
    const { responseCode, data } = await getAllDepartmentService({
      pageSize: 20,
      parentId: STRINGS.DEFAULTS.guid,
    });
    if (responseCode === 1001) setDepartment(data);
  };

  const selectBefore = (
    <Form.Item name="titleId" className="titleSelect">
      <Select
        style={{ padding: "0", width: "4.5rem", marginBottom: 0 }}
        getPopupContainer={(trigger) => trigger.parentNode}
      >
        {userTitle.map((titles) => (
          <Option key={titles.id} value={titles.id}>
            {titles.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
  useEffect(() => {
    fetchEmployees("", 0);
    getDepartment();
    if (isEdit) {
      dispatch(getUserBasicInfo(id));
      if (!countries.length) dispatch(getCountries());
      if (!cities.length) fetchCityData("", 0);
    }
    if (!designations.length) dispatch(getAllDesignation());
    if (!grades.length) dispatch(getAllGrades());
    if (!officeTimingGroups.length) dispatch(getAllOfficeTimingGroups());
    if (!accessRoles.length) {
      dispatch(getAllAccessRoles());
    }

    return () => {
      dispatch(resetBasicdetails());
    };
  }, []);
  useEffect(() => {
    if (isEdit) {
      setInitialValues({
        ...basicdetails,
        birthDate: moment(basicdetails.birthDate),
        joinDate: moment(basicdetails.joinDate),
        accessRoleId: basicdetails?.accessRoles?.map((item) => item.id),
      });
      setUserTypeValue(basicdetails.userTypeId);
      console.log(basicdetails.userTypeId, "setUserTypeValue");
    }
  }, [basicdetails]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);
  Object.defineProperty(form, "values", {
    value: function() {
      return {
        ...form.getFieldsValue(),
        birthDate: moment(form.getFieldValue("birthDate")._ds).format(),
        joinDate: moment(form.getFieldValue("joinDate")._ds).format(),
      };
    },
    writable: true,
    enumerable: true,
    configurable: true,
  });
  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const fetchCityData = (text, pgNo) => {
    dispatch(getCities({ textData: text, page: pgNo }));
  };
  const handleUpdateInfo = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        console.log("handleUpdateInfo");
      }
    } catch (e) {}
  };
  let classes = "employeeForm basicInfo ";
  classes += Direction === "ltr" ? "ltr" : "rtl";

  return (
    <div className={classes}>
      <Divider orientation="left"> {labels.BasicInfo}</Divider>
      <Form
        name="basicInfo"
        form={form}
        layout={"vertical"}
        initialValues={initialValues}
      >
        <Form.Item area="true" style={{ gridArea: "1/-2 / span 2 / span 1" }}>
          <SingleUpload
            url={isEdit ? initialValues.image : ""}
            value={profileImage}
            handleImageUpload={handleImageUpload}
            uploadText={labels.AddImage}
            multiple={false}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="firstName"
          label={labels.FirstName}
        >
          <Input
            placeholder={placeholder.fName}
            addonBefore={selectBefore}
          ></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="lastName"
          label={labels.LastName}
        >
          <Input placeholder={placeholder.lName}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="fatherName"
          label={labels.FatherName}
        >
          <Input placeholder={placeholder.fatherName}></Input>
        </Form.Item>
        <Form.Item
          rules={[{ required: true }, { type: "email" }]}
          name="email"
          label={labels.Email}
        >
          <Input placeholder={placeholder.email}></Input>
        </Form.Item>
        <Form.Item
          rules={[{ required: true }, { type: "email" }]}
          name="personalEmail"
          label={labels.PersonalEmail}
        >
          <Input placeholder={placeholder.pEmail}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="phoneNo"
          label={labels.PhoneNumber}
        >
          <Input placeholder={placeholder.phNo}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="nic"
          label={labels.CNICNumber}
        >
          <Input placeholder={placeholder.cnicNo}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="designationId"
          label={labels.Designation}
          placeholder="select your gender"
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            size="large"
            showSearch={true}
            placeholder="select your Designation"
          >
            {designations?.map((designation) => (
              <Option key={designation.id} value={designation.id}>
                {designation.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="managerId"
          label={labels.Manager}
          rules={[{ required: true }]}
        >
          <MemberSelect
            name="managerId"
            formItem={false}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={placeholder.searchToSelect}
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
          />
        </Form.Item>
        <Form.Item
          name="gradeId"
          label={labels.Grades}
          rules={[{ required: true }]}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch={true}
            size="large"
            placeholder={placeholder.searchToSelect}
            optionFilterProp="children"
          >
            {grades?.map((grade) => (
              <Option key={grade.id} value={grade.id}>
                {grade.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="countryId"
          label={labels.Country}
          // showSearch={true}
          rules={[{ required: true }]}
        >
          <Select
            showSearch={true}
            placeholder="Please select country."
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {countries.map((item) => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <CitySelect
          data={cities}
          selectedData={(val) => {
            // console.log("val", val);
          }}
          canFetchNow={cities && cities.length > 0}
          fetchData={fetchCityData}
          optionComponent={(opt) => {
            return (
              <>
                <Avatar src={opt.image} className="!bg-black">
                  {getNameForImage(opt.name)}
                </Avatar>
                {opt.name + " - " + opt.country}
              </>
            );
          }}
          defaultKey={"id"}
          isObject={true}
          placeholder={placeholder.searchToSelect}
          size="large"
          name="cityId"
          label={labels.City}
          rules={[{ required: true }]}
        />

        <Form.Item
          name="probationPeriod"
          label={labels.ProbationPeriod}
          rules={[{ required: true }]}
        >
          <Input
            placeholder={placeholder.probPeriod}
            size="large"
            type={"number"}
            min={1}
            step={"1"}
          />
        </Form.Item>
        <Form.Item
          name="noticePeriod"
          label={labels.NoticePeriod}
          rules={[{ required: true }]}
        >
          <Input
            placeholder={placeholder.noticePeriod}
            size="large"
            type={"number"}
            min={1}
            step={"1"}
          />
        </Form.Item>
        <Form.Item
          name="birthDate"
          label={labels.DateOfBirth}
          rules={[{ required: true }]}
        >
          <DatePicker
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.selectDate}
            size="large"
            format={"DD/MM/YYYY"}
          />
        </Form.Item>
        <Form.Item
          name="joinDate"
          label={labels.DateOfJoining}
          rules={[{ required: true }]}
        >
          <DatePicker
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.selectDate}
            size="large"
            format={"DD/MM/YYYY"}
          />
        </Form.Item>
        <Form.Item
          name="genderId"
          label={labels.Gender}
          rules={[{ required: true }]}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.selectGender}
            size="large"
          >
            {genderList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="maritalStatusId"
          label={labels.MaritalStatus}
          rules={[{ required: true }]}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.selectMarital}
            size="large"
          >
            {maritalStatusList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="officeTimingId"
          label={labels.OfficeShift}
          rules={[{ required: true }]}
        >
          <Select
            size="large"
            showSearch={true}
            placeholder={placeholder.selectShift}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {officeTimingGroups?.map((timing) => (
              <Option key={timing.id} value={timing.id}>
                {timing.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="employeeNo"
          label={labels.EmpNo}
          rules={[{ required: true }]}
        >
          <Input placeholder={placeholder.empNo} size="large" />
        </Form.Item>
        <Form.Item
          name="employmentTypeId"
          label={labels.EmploymentType}
          rules={[{ required: true }]}
        >
          <Select
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.empType}
          >
            {employmentType.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="userTypeId"
          label={labels.UserType}
          rules={[{ required: true }]}
        >
          <Select
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.selectUserType}
            onChange={(value) => {
              setUserTypeValue(value);
            }}
          >
            {userType.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="accessRoleId"
          rules={[{ required: true }]}
          label={labels.AccessRole}
        >
          <Select
            size="large"
            placeholder={placeholder.selectAccessRole}
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch={true}
            onChange={(value) => {
              console.log(value);
            }}
          >
            {/* {accessRoles
              .filter((ele) => {
                if (ele.roleTypeId === userTypeValue) return ele;
              })
              .map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))} */}
            {accessRoles.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="department"
          label={labels.department}
        >
          {/* <Input placeholder={placeholder.department}></Input> */}
          <Select
            size="large"
            placeholder={placeholder.department}
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch={true}
            onChange={(value) => {
              console.log(value);
            }}
          >
            {/* {accessRoles
              .filter((ele) => {
                if (ele.roleTypeId === userTypeValue) return ele;
              })
              .map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))} */}
            {department.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="subsidiary"
          label={labels.subsidiary}
        >
          <Input placeholder={placeholder.subsidiary}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="payroll"
          label={labels.payroll}
        >
          <Input placeholder={placeholder.payroll}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="subsidiaryOffice"
          label={labels.subsidiaryOffice}
        >
          <Input placeholder={placeholder.subsidiaryOffice}></Input>
        </Form.Item>
      </Form>
      <div className={isEdit ? "editButtons" : "buttons"}>
        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdateInfo}
          >
            {labels.UpdateBasicInfo}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
