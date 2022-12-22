import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
import { employeeDictionaryList } from '../localization/index';
import {
  DatePicker,
  Checkbox,
  Form,
  Divider,
  Input,
  Button,
  Table,
  Avatar,
} from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  getEducationDetailByUser,
  updateUserEducationAction,
} from '../../education/store/actions';
import CitySelect from '../../../sharedComponents/AntdCustomSelects/SharedSelects/CitySelect';
import { getNameForImage } from '../../../../utils/base';
import { getCities } from '../../../../utils/Shared/store/actions';
const { RangePicker } = DatePicker;

const EducationForm = ({ id, mode }) => {
  const isEdit = mode === 'edit';
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const [isPresent, setIsPresent] = useState(false);
  const { employeesDictionary, Direction } = employeeDictionaryList[
    userLanguage
  ];
  const {
    employee: { educationdetails },
    success,
  } = useSelector((state) => state.employeeSlice);
  const [city, setCity] = useState([]);
  const { cities } = useSelector((state) => state.sharedSlice);
  const labels = employeesDictionary.EducationForm;
  const placeholder = employeesDictionary.placeholders;
  const [educationDetails, setEducationDetails] = useState([]);
  const [newUserId, setNewUserId] = useState('');

  const [form] = Form.useForm();
  Object.defineProperty(form, 'values', {
    value: function() {
      return educationDetails.map((item) => {
        return {
          ...item,
          startDate: moment(item[0]?.startEndDate?._ds)?.format(),
          endDate: item?.isPresent
            ? ''
            : moment(item[1]?.startEndDate?._ds)?.format(),
        };
      });
    },
    writable: true,
    enumerable: true,
    configurable: true,
  });
  useEffect(() => {
    if (success) setEducationDetails([]);
  }, [success]);

  const initialState = {
    degree: '',
    institute: '',
    description: '',
    totalMarks: '',
    obtainedMarks: '',
    startDate: '',
    cityId: [],
    isPresent: false,
  };
  const [initialValues, setInitialValues] = useState(initialState);

  const columns = () => [
    {
      title: labels.Degree,
      dataIndex: 'degree',
      key: 'degree',
    },
    {
      title: labels.Institute,
      dataIndex: 'institute',
      key: 'institute',
    },
    {
      title: labels.City,
      dataIndex: 'cityId',
      key: 'cityId',
      render: (value) => {
        return city?.filter((item) => item.id === value?.toString())?.[0]?.name;
      },
    },
    {
      title: labels.Description,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: labels.ObtainedMarks,
      dataIndex: 'obtainedMarks',
      key: 'obtainedMarks',
    },
    {
      title: labels.TotalMarks,
      dataIndex: 'totalMarks',
      key: 'totalMarks',
    },

    {
      title: labels.StartEndDate,
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value, row) => {
        return value?.length
          ? `${moment(row.startDate[0]).format('YYYY/MM/DD')} - ${moment(
              row.startDate[1]
            ).format('YYYY/MM/DD')}`
          : `${moment(row.start).format('YYYY/MM/DD')} -  Present`;
      },
    },

    {
      title: sharedLabels.action,
      render: (value, row, rowIndex) => {
        return (
          <a
            href=" "
            onClick={function(e) {
              e.preventDefault();
              if (isEdit) {
                handleRowChange(rowIndex);
                console.log(value?.id, 'value');
                setNewUserId(value?.id);
              } else {
                const filterArray = educationDetails.filter((value, i) => {
                  if (rowIndex !== i) return value;
                });
                setEducationDetails(filterArray);
              }
            }}
          >
            {isEdit ? sharedLabels.Edit : sharedLabels.Delete}
          </a>
        );
      },
    },
  ];

  const handleRowChange = (rowIndex) => {
    setInitialValues(educationDetails[rowIndex]);
    let bankDetailsArr = [...educationDetails];
    bankDetailsArr.splice(rowIndex, 1);
    setEducationDetails(bankDetailsArr);
  };
  const handleAddMore = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        setEducationDetails((preValues) => [
          ...preValues,
          form.getFieldsValue(),
        ]);
        form.resetFields();
        setIsPresent(false);
        setInitialValues(initialState);
      }
    } catch (err) {
      throw new Error(`Error in validation ${err}`, { cause: err });
    }
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
    if (isEdit) setIsPresent(initialValues.isPresent);
  }, [initialValues, form]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getEducationDetailByUser(id));
      if (!cities.length) fetchCityData('', 0);
    }
    return () => {
      form.setFieldsValue(initialValues);
    };
  }, []);

  useEffect(() => {
    if (isEdit) {
      setEducationDetails(
        educationdetails?.map((item) => {
          return {
            ...item,
            startDate: item.isPresent
              ? moment(item.startDate)
              : [moment(item.startDate), moment(item.endDate)],
          };
        })
      );
    }
  }, [educationdetails]);

  const fetchCityData = (text, pgNo) => {
    dispatch(getCities({ textData: text, page: pgNo }));
  };

  let classes = 'employeeForm educationDetails ';
  classes += Direction === 'ltr' ? 'ltr' : 'rtl';

  const createPayload = () => {
    const payload = {
      id: newUserId,
      userId: id,
      institute: form.getFieldValue('institute'),
      degree: form.getFieldValue('degree'),
      description: form.getFieldValue('description'),
      totalMarks: form.getFieldValue('totalMarks'),
      obtainedMarks: form.getFieldValue('obtainedMarks'),
      startDate: form.getFieldValue('startDate')[0],
      endDate: form.getFieldValue('startDate')[1],
      cityId: form.getFieldValue('cityId'),
      isPresent: form.getFieldValue('isPresent'),
    };
    return payload;
  };

  const handleUpdate = () => {
    const payload = createPayload();
    console.log(payload, 'payload');
    dispatch(updateUserEducationAction(payload));
    setEducationDetails((preValues) => [...preValues, payload]);
    setInitialValues(initialState);
    form.resetFields();
  };

  return (
    <div className={classes}>
      <Divider orientation="left"> {labels.EducationInfo}</Divider>
      <Form
        name="educationDetails"
        form={form}
        layout={'vertical'}
        initialValues={initialValues}
      >
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="degree"
          label={labels.Degree}
        >
          <Input placeholder={placeholder.degree}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="institute"
          label={labels.Institute}
        >
          <Input placeholder={placeholder.institute}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="description"
          label={labels.Description}
        >
          <Input placeholder={placeholder.desc}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="totalMarks"
          label={labels.TotalMarks}
        >
          <Input type="number" placeholder={placeholder.tMarks}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="obtainedMarks"
          label={labels.ObtainedMarks}
        >
          <Input type="number" placeholder={placeholder.oMarks}></Input>
        </Form.Item>

        <CitySelect
          data={cities}
          selectedData={(val, obj) => {
            setCity((preValues) => [...preValues, ...obj]);
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
          rules={[{ required: true }]}
        />

        <div className="dates">
          {!isPresent && (
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="startDate"
              label={labels.StartEndDate}
            >
              <RangePicker
                getPopupContainer={(trigger) => trigger.parentNode}
                size="large"
                format={'DD/MM/YYYY'}
                placeholder={[placeholder.sDate, placeholder.eDate]}
              />
            </Form.Item>
          )}

          {isPresent && (
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="startDate"
              label={labels.StartDate}
            >
              <DatePicker
                getPopupContainer={(trigger) => trigger.parentNode}
                format={'DD/MM/YYYY'}
                placeholder={labels.start}
                size="large"
              />
            </Form.Item>
          )}

          <Form.Item name="isPresent" valuePropName="checked">
            <Checkbox
              onChange={() => {
                setIsPresent(!isPresent);
                form.setFieldValue('startDate', '');
                form.setFieldValue('startEndDate', '');
              }}
            >
              {labels.Present}
            </Checkbox>
          </Form.Item>
        </div>
      </Form>
      <div className={isEdit ? 'editButtons' : 'buttons'}>
        <Button
          type="dashed"
          className="btn addMore"
          icon={<PlusOutlined />}
          onClick={handleAddMore}
        >
          {labels.AddEducation}
        </Button>

        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdate}
          >
            {labels.UpdateEducation}
          </Button>
        )}
      </div>
      {educationDetails.length > 0 && (
        <Table
          columns={columns()}
          dragable={true}
          dataSource={educationDetails}
        />
      )}
    </div>
  );
};

export default EducationForm;
