import { useContext, useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, Select, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { employeeDictionaryList } from '../localization/index';
import SingleUpload from '../../../sharedComponents/Upload/singleUpload';
import { EditOutlined } from '@ant-design/icons';
import {
  userTypeList,
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

const BasicInfo = ({ mode, id }) => {
  const isEdit = mode === 'edit';
  const [form] = Form.useForm();
  const [selectedAccessRole, setSelectedAccessRole] = useState([]);
  const [userSelectedAccessRole, setUserSelectedAccessRole] = useState([]);
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
    accessRoles: [],
    employeeNo: [],
    employmentTypeId: [],
  };

  const [profileImage, setProfileImage] = useState(null);
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
  console.log(basicdetails, 'basicDetails');

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
    dispatch(getAllAccessRoles());

    if (isEdit) {
      dispatch(getUserBasicInfo(id));
      if (!countries.length) dispatch(getCountries());
      if (!cities.length) fetchCityData('', 0);
      if (!designations.length) dispatch(getAllDesignation());
      if (!grades.length) dispatch(getAllGrades());
      if (!officeTimingGroups?.length) dispatch(getAllOfficeTimingGroups());
      if (!accessRoles.length) dispatch(getAllAccessRoles());
      if (!department.length) getAllDepartments();
    }
    return () => {
      dispatch(resetBasicdetails());
    };
  }, []);

  const handleImageUpload = (fileData) => {
    console.log('handleImageUpload', fileData);
    setProfileImage(fileData[0].originFileObj);
  };
  console.log(accessRoles, 'accessRoles');
  // const getAccessRoleName = (accessRoleId) => {
  //   const accessRole = accessRoles.find((role) => role.name === accessRoleId);
  //   return accessRole ? accessRole.name : '';
  // };
  useEffect(() => {
    if (isEdit) {
      setInitialValues({
        ...basicdetails,
        image,
        birthDate: basicdetails.birthDate ? moment(basicdetails.birthDate) : '',
        joinDate: moment(basicdetails.joinDate),
        accessRoles: basicdetails?.accessRoles?.map((role) => {
          return role.accessRole;
        }),
        // accessRoles: basicdetails?.accessRoles?.map((role) => {
        //   return getAccessRoleName(role.accessRole);
        // }),
        officeTimingId:
          basicdetails.officeTimingId === STRINGS.DEFAULTS.guid
            ? ''
            : basicdetails.officeTimingId,
        managerId: basicdetails.managerId
          ? basicdetails.managerId
          : STRINGS.DEFAULTS.guid,
        countryId:
          basicdetails.countryId === STRINGS.DEFAULTS.guid
            ? ''
            : basicdetails.countryId,
        cityId:
          basicdetails.cityId === STRINGS.DEFAULTS.guid
            ? ''
            : basicdetails.cityId,
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
  let image = {
    file: profileImage,
    id: STRINGS.DEFAULTS.guid,
  };

  const handleUpdateInfo = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        let payload = form.getFieldsValue();
        let payloadRoles = userSelectedAccessRole.map((role) => {
          return {
            id: role.value,
          };
        });
        console.log(payloadRoles, 'PAYLOAD ROLES');
        if (payload) {
          payload = {
            ...payload,
            accessRoles: payloadRoles,
            image,
            id: id,
            birthDate: moment(form.getFieldValue('birthDate')._ds).format(),
            joinDate: moment(form.getFieldValue('joinDate')._ds).format(),
            probationPeriod: parseInt(payload.probationPeriod),
            noticePeriod: isEdit ? 30 : parseInt(payload.noticePeriod),
          };
          console.log(payload, 'payload');
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
  console.log(selectedAccessRole, 'selectedAccessRole');
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
            handleImageUpload={handleImageUpload}
            position="flex-start"
            uploadText={labels.upload}
            multiple={false}
            url={basicdetails?.image?.url}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
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
          rules={[{ required: true }]}
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
        </Form.Item>
        <Form.Item name="managerId" label={labels.Manager}>
          <Select
            showSearch={true}
            placeholder={placeholder.searchToSelect}
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
            optionFilterProp="children"
            value={isEdit && basicdetails.manager?.id}
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
          >
            {firstTimeEmpData.map((item) => (
              <Option key={item.id} value={item.id}>
                <Avatar src={item.image} className="!bg-black">
                  {getNameForImage(item.name)}
                </Avatar>
                <span className="ml-1 text-semibold">{item.name}</span>
              </Option>
            ))}
          </Select>
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
            optionFilterProp="children"
            value={isEdit ? basicdetails.country : basicdetails.countryId}
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
          value={isEdit ? basicdetails.city : basicdetails.cityId}
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
            rules={[{ required: true }]}
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

        {!(isEdit && basicdetails.userTypeId === userTypeEnum.SuperAdmin) ? (
          <Form.Item
            name="userTypeId"
            label={labels.UserType}
            rules={[{ required: true }]}
          >
            <Select
              size="large"
              getPopupContainer={(trigger) => trigger.parentNode}
              placeholder={placeholder.selectUserType}
              options={userTypeList
                .filter(
                  (x) =>
                    x.id === userTypeEnum.Employee ||
                    x.id === userTypeEnum.Admin
                )
                .map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              value={basicdetails.userTypeId}
              onChange={(value) => {
                // console.log(value, 'filteredRoles');
                // Filter accessRoles based on selected user type
                let filteredRoles = accessRoles.filter((role) => {
                  if (value === userTypeEnum.Admin) {
                    return role.roleTypeId === userTypeEnum.Admin;
                  } else if (value === userTypeEnum.Employee) {
                    return role.roleTypeId === userTypeEnum.Employee;
                  }
                  return false;
                });

                const selectedRoleIds = form.getFieldValue('accessRoles');
                const unselectedRoles = filteredRoles.filter(
                  (role) => !selectedRoleIds.includes(role.id)
                );
                // console.log(unselectedRoles, 'unselectedRoles');
                // console.log(selectedRoleIds, 'selectedRoleIds');
                setSelectedAccessRole(
                  unselectedRoles.map((role) => {
                    return {
                      value: role.id,
                      label: role.name,
                    };
                  })
                );
              }}
            >
              {userTypeList.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}

        {basicdetails.userTypeId === userTypeEnum.SuperAdmin ? null : (
          <Form.Item
            name="accessRoles"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    getFieldValue('userTypeId') === userTypeEnum.Admin ||
                    (value && value.length > 0)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'Please select at least one access role.'
                  );
                },
              }),
            ]}
            label={labels.AccessRole}
          >
            <Select
              size="large"
              placeholder={placeholder.selectAccessRole}
              getPopupContainer={(trigger) => trigger.parentNode}
              showSearch={true}
              mode="multiple"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                console.log(value, 'selected value');
                const userSelectedRoles = value.map((role) => {
                  return {
                    // value: role,
                    // value: accessRoles.find((x) => x.name === role)?.id,
                    value: accessRoles.find((x) => x.name === role)?.id
                      ? accessRoles.find((x) => x.name === role)?.id
                      : role,
                  };
                });
                console.log(userSelectedRoles, 'userSelectedRoles');
                setUserSelectedAccessRole(userSelectedRoles);
              }}
              options={selectedAccessRole.map((role) => {
                return {
                  value: role.value,
                  label: role.label,
                };
              })}
            >
              {selectedAccessRole.map((role) => (
                <Option key={role.value} value={role.value}>
                  {role.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

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
                // console.log(value);
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
