import { Button, DatePicker, Divider, Form, Input, Select, Avatar } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { employeeDictionaryList } from '../localization/index';
import SingleUpload from '../../../sharedComponents/Upload/singleUpload';
import { EditOutlined } from '@ant-design/icons';
import {
  userType,
  userTitle,
  genderList,
  maritalStatusList,
  employmentType,
  userTypeEnum,
} from '../../../../utils/Shared/enums/enums';
import { useDispatch } from 'react-redux';
import {
  getAllEmployees,
  getCities,
  getCountries,
} from '../../../../utils/Shared/store/actions';
import { getAllGrades } from '../../grade/store/actions';
import { getAllDepartmentService } from '../../departments/services/service';
import { getAllAccessRoles } from '../../accessRole/store/action';
import { getAllOfficeTimingGroups } from '../../officeTimings/store/actions';
import { getUserBasicInfo } from '../../basicInfo/store/actions';
import moment from 'moment';
import MemberSelect from '../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { getNameForImage, STRINGS } from '../../../../utils/base';
import CitySelect from '../../../sharedComponents/AntdCustomSelects/SharedSelects/CitySelect';
import { resetBasicdetails } from '../store/slice';
import { getAllDesignation } from '../../designation/store/actions';
import { getAllBranch } from '../../subsidiary/store/actions';
import { getAllBranchOffice } from '../../subsidiaryOffice/store/actions';
import { updateEmployeeAction } from '../store/actions';
import CustomSelect from '../../../sharedComponents/Select/Select';
import { getAllDepartments } from '../../departments/store/actions';

const { Option } = Select;

const BasicInfo = ({ mode, profileImage, handleImageUpload, id }) => {
  const isEdit = mode === 'edit';
  const [form] = Form.useForm();
  const initialState = {
    coverImageId: '',
    userTypeId: '',
    titleId: 1,
    firstName: '',
    lastName: '',
    fatherName: '',
    email: '',
    personalEmail: '',
    nic: '',
    phoneNo: '',
    designationId: [],
    managerId: [],
    gradesId: [],
    countryId: [],
    cityId: [],
    probationPeriod: '',
    birthDate: '',
    joinDate: '',
    genderId: [],
    maritalStatusId: [],
    officeTimingId: [],
    accessRoleId: [],
    employeeNo: [],
    employmentTypeId: [],
  };
  const [showSubsidary, setShowSubsidary] = useState(false);
  const [department, setDepartment] = useState([]);
  const [initialValues, setInitialValues] = useState(initialState);
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
  const { items } = useSelector((state) => state.subsidiarySlice);
  const subsidiaryOffice = useSelector((state) => state.subsidiaryOfficeSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employeesDictionary, Direction } = employeeDictionaryList[
    userLanguage
  ];
  console.log(accessRoles, 'accessRoles');
  console.log(userType, 'userType');
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
  console.log(basicdetails, 'basicDetailss');

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
        style={{
          padding: '0',
          width: '4.5rem',
          marginBottom: 0,
        }}
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
    fetchEmployees('', 0);
    getDepartment();
    dispatch(getAllBranch());
    dispatch(getAllBranchOffice());

    if (isEdit) {
      dispatch(getUserBasicInfo(id));
      if (!countries?.length) dispatch(getCountries());
      if (!cities?.length) fetchCityData('', 0);
    }
    if (!designations?.length) dispatch(getAllDesignation());
    if (!grades?.length) dispatch(getAllGrades());
    if (!officeTimingGroups?.length) dispatch(getAllOfficeTimingGroups());
    if (!accessRoles?.length) {
      dispatch(getAllAccessRoles());
    }
    if (!department?.length) getAllDepartments();

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
        accessRoleId: basicdetails?.accessRoles?.map(
          (item) => item.accessRoleId
        ),
        userTypeId: basicdetails.userTypeId,
        officeTimingId:
          basicdetails.officeTimingId === STRINGS.DEFAULTS.guid
            ? ''
            : basicdetails.officeTimingId,
        managerId: basicdetails.manager?.id
          ? basicdetails.manager?.id
          : STRINGS.DEFAULTS.guid,
      });
    }
  }, [basicdetails]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  Object.defineProperty(form, 'values', {
    value: function() {
      return {
        ...form.getFieldsValue(),
        birthDate: moment(form.getFieldValue('birthDate')._ds).format(),
        joinDate: moment(form.getFieldValue('joinDate')._ds).format(),
      };
    },
    writable: true,
    enumerable: true,
    configurable: true,
  });
  const fetchEmployees = (text, pgNo) => {
    dispatch(
      getAllEmployees({
        text,
        pgNo,
        pgSize: 20,
      })
    );
  };
  const fetchCityData = (text, pgNo) => {
    dispatch(
      getCities({
        textData: text,
        page: pgNo,
      })
    );
  };

  const handleUpdateInfo = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        let payload = form.getFieldsValue();
        console.log('payload', payload);
        if (payload) {
          payload = {
            ...payload,
            id: id,
            birthDate: moment(form.getFieldValue('birthDate')._ds).format(),
            joinDate: moment(form.getFieldValue('joinDate')._ds).format(),
            probationPeriod: parseInt(payload.probationPeriod),
            // noticePeriod: parseInt(payload.noticePeriod),
            noticePeriod: 30,
          };
          dispatch(
            updateEmployeeAction({
              data: payload,
            })
          );
        }
      }
    } catch (err) {
      console.log(err.message);
      throw new Error(`Error in handleUpdateInfo: ${err.message}`, {
        cause: err,
      });
    }
  };

  let classes = 'employeeForm basicInfo ';
  classes += Direction === 'ltr' ? 'ltr' : 'rtl';
  return (
    <div className={classes}>
      <Divider orientation="left"> {labels.BasicInfo}</Divider>
      <Form
        name="basicInfo"
        form={form}
        layout={'vertical'}
        initialValues={initialValues}
      >
        <Form.Item
          area="true"
          style={{
            gridArea: '1/-2 / span 2 / span 1',
          }}
        >
          <SingleUpload
            url={isEdit ? initialValues.image : ''}
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
        <Form.Item name="fatherName" label={labels.FatherName}>
          <Input placeholder={placeholder.fatherName}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
            {
              type: 'email',
            },
          ]}
          name="email"
          label={labels.Email}
        >
          <Input placeholder={placeholder.email}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
            {
              type: 'email',
            },
          ]}
          name="personalEmail"
          label={labels.PersonalEmail}
        >
          <Input placeholder={placeholder.pEmail}></Input>
        </Form.Item>
        <Form.Item name="phoneNo" label={labels.PhoneNumber}>
          <Input placeholder={placeholder.phNo}></Input>
        </Form.Item>
        <Form.Item name="nic" label={labels.CNICNumber}>
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
          placeholder={placeholder.selectGender}
        >
          <CustomSelect
            showSearch={true}
            data={designations}
            size="large"
            placeholder="Please select Designation"
            defaultValue={initialValues.designationId}
          />
          {/* <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            size="large"
            showSearch={true}
            placeholder={placeholder.selectDesignation}
            defaultValue={""}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={designations?.map((val) => {
              return {
                value: val.id,
                label: val.name,
              };
            })}
          >
            {designations?.map((designation) => (
              <Option key={designation.name} value={designation.name}>
                {designation.name}
              </Option>
            ))}
          </Select> */}
        </Form.Item>
        <Form.Item name="managerId" label={labels.Manager}>
          <MemberSelect
            name="managerId"
            formItem={false}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={placeholder.searchToSelect}
            showSearch={true}
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
        <Form.Item name="gradeId" label={labels.Grades}>
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
        <Form.Item name="countryId" label={labels.Country}>
          <Select
            showSearch={true}
            placeholder={placeholder.selectCountry}
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
            console.log('val', val);
          }}
          canFetchNow={cities && cities.length > 0}
          fetchData={fetchCityData}
          optionComponent={(opt) => {
            return (
              <>
                <Avatar src={opt.image} className="!bg-black">
                  {getNameForImage(opt.name)}
                </Avatar>
                {opt.name + ' - ' + opt.country}
              </>
            );
          }}
          defaultKey={'id'}
          isObject={true}
          placeholder={placeholder.searchToSelect}
          size="large"
          name="cityId"
          label={labels.City}
        />
        <Form.Item name="probationPeriod" label={labels.ProbationPeriod}>
          <Input
            placeholder={placeholder.probPeriod}
            size="large"
            type={'number'}
            step={'1'}
            min={1}
          />
        </Form.Item>
        {!isEdit && (
          <Form.Item
            name="noticePeriod"
            label={labels.NoticePeriod}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={placeholder.noticePeriod}
              size="large"
              type={'number'}
              min={1}
              step={'1'}
            />
          </Form.Item>
        )}
        <Form.Item name="birthDate" label={labels.DateOfBirth}>
          <DatePicker
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.selectDate}
            size="large"
            format={'DD/MM/YYYY'}
          />
        </Form.Item>
        <Form.Item name="joinDate" label={labels.DateOfJoining}>
          <DatePicker
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.selectDate}
            size="large"
            format={'DD/MM/YYYY'}
          />
        </Form.Item>
        <Form.Item
          name="genderId"
          label={labels.Gender}
          rules={[
            {
              required: true,
            },
          ]}
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
        <Form.Item name="maritalStatusId" label={labels.MaritalStatus}>
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
        <Form.Item name="officeTimingId" label={labels.OfficeShift}>
          <Select
            size="large"
            showSearch={true}
            placeholder={placeholder.selectShift}
            getPopupContainer={(trigger) => trigger.parentNode}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={(officeTimingGroups || [])?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })}
          >
            {officeTimingGroups?.map((timing) => (
              <Option key={timing.id} value={timing.id}>
                {timing.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="employeeNo" label={labels.EmpNo}>
          <Input placeholder={placeholder.empNo} size="large" />
        </Form.Item>
        <Form.Item name="employmentTypeId" label={labels.EmploymentType}>
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
        {isEdit ? (
          <>
            <Form.Item
              name="userTypeId"
              label={labels.UserType}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              &nbsp;&nbsp;
              <strong>
                {basicdetails?.userTypeId === 1 ? 'Admin' : 'Employee'}
              </strong>
            </Form.Item>
          </>
        ) : (
          <Form.Item
            name="userTypeId"
            label={labels.UserType}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              size="large"
              getPopupContainer={(trigger) => trigger.parentNode}
              placeholder={placeholder.selectUserType}
            >
              {userType.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name="accessRoleId"
          rules={[
            {
              required: true,
            },
          ]}
          label={labels.AccessRole}
        >
          <Select
            size="large"
            placeholder={placeholder.selectAccessRole}
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch={true}
            onChange={(value) => {
              console.log(value, 'accessrole');
            }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={accessRoles
              .filter((x) => x.roleTypeId === initialState.userTypeId)
              .map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
          >
            {accessRoles.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="departmentId" label={labels.department}>
          <Select
            size="large"
            placeholder={placeholder.department}
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch={true}
            onChange={(value) => {
              console.log(value);
            }}
          >
            {department.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {!isEdit && (
          <Form.Item
            name="subsidiary"
            rules={[
              {
                required: false,
              },
            ]}
            label={labels.subsidiary}
          >
            <Select
              size="large"
              placeholder={placeholder.subsidiary}
              getPopupContainer={(trigger) => trigger.parentNode}
              showSearch={true}
              onChange={() => setShowSubsidary((prev) => !prev)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={items?.map((item) => {
                return {
                  value: item?.id,
                  label: item?.branchTitle,
                };
              })}
            >
              {items?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.branchTitle}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {showSubsidary && (
          <Form.Item
            name="subsidiaryOffice"
            rules={[
              {
                required: false,
              },
            ]}
            label={labels.subsidiaryOffice}
          >
            <Select
              size="large"
              placeholder={placeholder.subsidiaryOffice}
              getPopupContainer={(trigger) => trigger.parentNode}
              showSearch={true}
              onChange={(value) => {
                console.log(value);
              }}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={subsidiaryOffice?.items.map((val) => {
                return {
                  value: val.id,
                  label: val.name,
                };
              })}
            >
              {subsidiaryOffice?.items.map((val) => (
                <Select.Option key={val.id} value={val.id}>
                  {val.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {!isEdit && (
          <Form.Item name="payroll" label={labels.payroll}>
            <Input placeholder={placeholder.payroll}></Input>
          </Form.Item>
        )}
      </Form>

      <div className={isEdit ? 'editButtons' : 'buttons'}>
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
