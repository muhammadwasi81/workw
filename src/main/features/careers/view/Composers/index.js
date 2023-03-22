import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  List,
  message,
  Select,
} from "antd";
import { useDispatch } from "react-redux";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { getAllDepartmentService } from "../../../departments/services/service";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import {
  createGuid,
  getNameForImage,
  modifySelectData,
  STRINGS,
} from "../../../../../utils/base";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import {
  getAllEmployees,
  getCities,
} from "../../../../../utils/Shared/store/actions";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import CitySelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/CitySelect";
import {
  CareerLevelTypeEnum,
  EducationTypeEnum,
  JobShiftTypeEnum,
  JobTypeEnum,
} from "../../utils/enums";
import { getAllDefaultHiringCriteriaService } from "../../defaultHiringCriteria/services/service";
import { getAllDesignation } from "../../../designation/store/actions";
import { addCareer } from "../../store/action";

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  // const [designation, setDesignation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [reviewCriteria, setReviewCriteria] = useState([]);
  const { cities } = useSelector((state) => state.sharedSlice);

  const { labels, placeHolder } = CareerDictionaryList;
  const { success } = useSelector((state) => state.careerSlice);
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

  const {
    designationSlice: { designations },
  } = useSelector((state) => state);

  const { createLoader } = useSelector((state) => state.careerSlice);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  useEffect(() => {
    dispatch(getAllDesignation());
  }, []);

  const getDepartment = async () => {
    const { responseCode, data } = await getAllDepartmentService({
      pageSize: 20,
      parentId: STRINGS.DEFAULTS.guid,
    });

    if (responseCode === 1001) setDepartment(data);
  };
  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const getReviewCriteria = async () => {
    const { responseCode, data } = await getAllDefaultHiringCriteriaService();
    if (responseCode === 1001) setReviewCriteria(data);
  };
  const fetchCityData = (text, pgNo) => {
    dispatch(getCities({ textData: text, page: pgNo }));
  };
  const handleAddCriteria = () => {
    const value = form.getFieldValue("reviewCriteria");
    const newObj = {
      id: createGuid(),
      question: value,
      remove: true,
    };
    setReviewCriteria((preValue) => [...preValue, newObj]);
    form.setFieldValue("reviewCriteria", "");
  };
  const handleDeleteCriteria = (id) => {
    let reviewCriteriaArr = [...reviewCriteria];
    reviewCriteriaArr = reviewCriteriaArr.filter((item) => item.id !== id);
    setReviewCriteria(reviewCriteriaArr);
  };
  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (!cities.length) fetchCityData("", 0);
    fetchEmployees("", 0);
    getDepartment();
    getReviewCriteria();
  }, []);

  const onFinish = (values) => {
    console.log(values, "testing in process");
    let image = {
      id: STRINGS.DEFAULTS.guid,
      file: profileImage && profileImage[0]?.originFileObj,
    };
    console.log(image, "IMAGE STATUS");

    let payload = {
      ...values,
      endDate: values.endDate.format(),
      members: modifySelectData(values.members).map((el, index) => {
        return {
          memberId: el,
        };
      }),
      approvers: modifySelectData(values.approvers).map((el, index) => {
        return {
          approverId: el,
        };
      }),
      postInterviewers: modifySelectData(values.postInterviewers).map(
        (el, index) => {
          return {
            userId: el,
          };
        }
      ),
      interviewers: modifySelectData(values.interviewers).map((el, index) => {
        return {
          userId: el,
        };
      }),
      skills: values.skills.join(),
    };
    console.log(payload);
    dispatch(addCareer({ ...payload, image }));
    if (success) {
    }
  };

  // const onFinish = (values) => {
  //   console.log(values, "testing in process");
  //   let image = {
  //     id: STRINGS.DEFAULTS.guid,
  //     file: profileImage && profileImage[0]?.originFileObj,
  //   };
  //   console.log(image, "IMAGE STATUS");
  //   // if (image.file === null || image.file === undefined ) {
  //   //   message.error("Attachement can't be emty")
  //   // }
  //   //TODO: work on this
  //   if (
  //     values.members === undefined ||
  //     values.approvers === undefined ||
  //     values.postInterviewers ||
  //     values.interviewers
  //   ) {
  //     let payload = {
  //       ...values,
  //       endDate: values.endDate.format(),
  //       skills: values.skills.join(),
  //     };
  //     dispatch(addCareer({ ...payload, image }));
  //     if (success) {
  //     }
  //   } else {
  //     let payload = {
  //       ...values,
  //       endDate: values.endDate.format(),
  //       members: modifySelectData(values.members).map((el, index) => {
  //         return {
  //           memberId: el,
  //         };
  //       }),
  //       approvers: modifySelectData(values.approvers).map((el, index) => {
  //         return {
  //           approverId: el,
  //         };
  //       }),
  //       postInterviewers: modifySelectData(values.postInterviewers).map(
  //         (el, index) => {
  //           return {
  //             userId: el,
  //           };
  //         }
  //       ),
  //       interviewers: modifySelectData(values.interviewers).map((el, index) => {
  //         return {
  //           userId: el,
  //         };
  //       }),
  //       skills: values.skills.join(),
  //     };
  //     console.log(payload);
  //     dispatch(addCareer({ ...payload, image }));
  //     if (success) {
  //     }
  //   }
  // };

  return (
    <>
      <Form
        form={form}
        name="createCareer"
        className={Direction === "rtl" ? "createCareerRight" : "createCareer"}
        // initialValues={initialState}
        onFinish={onFinish}
        layout="vertical"
        // style={{ direction: Direction }}
        style={{ direction: Direction }}
      >
        <Form.Item
          label={labels.designation}
          name="designationId"
          rules={[
            {
              required: true,
              message: "Please Enter Designation",
            },
          ]}
        >
          <Select placeholder={placeHolder.selectDesignation} size="large">
            {designations.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={labels.jobdescription}
          name="description"
          rules={[
            {
              required: true,
              message: "Enter Job Description",
            },
          ]}
        >
          <Input.TextArea placeholder={labels.jobdescription} />
        </Form.Item>
        <div className="salaryRangeInputs">
          <Form.Item
            label={labels.salaryRange}
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name={"minSalary"}
              rules={[
                {
                  required: true,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Input
                size="large"
                placeholder={placeHolder.enterMinSalary}
                type="number"
              />
            </Form.Item>
            <Form.Item
              name={"maxSalary"}
              rules={[
                {
                  required: true,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input
                size="large"
                placeholder={placeHolder.enterMaxSalary}
                type="number"
              />
            </Form.Item>
          </Form.Item>
        </div>
        <Form.Item
          label={labels.department}
          name="departmentId"
          rules={[
            {
              required: true,
              message: "Please Enter Department",
            },
          ]}
        >
          <Select placeholder={placeHolder.selectDepartment} size="large">
            {department.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={labels.supervisor}
          name="managerId"
          rules={[
            {
              required: true,
              message: "Please Select Supervisor",
            },
          ]}
        >
          <MemberSelect
            name="managerId"
            mode="multiple"
            formitem={false}
            placeholder={placeHolder.selectSupervisor}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
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
          label={labels.interviewers}
          name="interviewers"
          rules={[
            {
              required: true,
              message: "Please Select Interviewers",
            },
          ]}
        >
          <MemberSelect
            name="interviewers"
            mode="multiple"
            formitem={false}
            placeholder={placeHolder.selectInterviewers}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
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
        <Form.Item label={labels.postInterviewers} name="postInterviewers">
          <MemberSelect
            name="postInterviewers"
            mode="multiple"
            formitem={false}
            placeholder={placeHolder.selectPostInterviewers}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
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
        <Form.Item label={labels.hiringBuddy} name="hiringBuddyId">
          <MemberSelect
            name="hiringBuddyId"
            mode="multiple"
            formitem={false}
            placeholder={placeHolder.hiringBuddy}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
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
        <Form.Item name="members" label={labels.members}>
          <MemberSelect
            name="members"
            mode="multiple"
            formitem={false}
            placeholder={placeHolder.selectMembers}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
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
        <Form.Item name="approvers" label={labels.approvers} showSearch={true}>
          <MemberSelect
            name="approvers"
            mode="multiple"
            formitem={false}
            placeholder={placeHolder.selectApprovers}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
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
          placeholder={placeHolder.selectCity}
          size="large"
          name="cityId"
          label={labels.city}
          rules={[{ required: true }]}
        />
        <Form.Item name="skills" label={labels.skills}>
          <Select
            size="large"
            placeholder={placeHolder.addSkills}
            mode="tags"
          />
        </Form.Item>
        <Form.Item name={"experience"} label={labels.experienceLabel}>
          <Input size="large" placeholder={labels.experience} type="number" />
        </Form.Item>

        <div className="w-full flex gap-3 mb-2">
          <Form.Item
            className="w-2/4"
            label={labels.jobType}
            name="jobType"
            rules={[
              {
                required: true,
                message: "Please Enter Job Type",
              },
            ]}
          >
            <Select placeholder={placeHolder.selectJobType} size="large">
              {JobTypeEnum.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="w-2/4"
            label={labels.jobShift}
            name="jobShift"
            rules={[
              {
                required: true,
                message: "Please Enter Job Shift",
              },
            ]}
          >
            <Select placeholder={placeHolder.selectJobshift} size="large">
              {JobShiftTypeEnum.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="w-full flex gap-3 mb-2">
          <Form.Item
            className="w-2/4"
            label={labels.education}
            name="education"
            rules={[
              {
                required: true,
                message: "Please Select Education",
              },
            ]}
          >
            <Select placeholder={placeHolder.selectEducation} size="large">
              {EducationTypeEnum.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="w-2/4"
            label={labels.careerLevel}
            name="careerLevel"
            rules={[
              {
                required: true,
                message: "Please Enter Career Level",
              },
            ]}
          >
            <Select placeholder={placeHolder.selectCareerLevel} size="large">
              {CareerLevelTypeEnum.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="endDate"
          label={labels.endDate}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            size="large"
            className="w-full"
            placeholder={placeHolder.selectEndDate}
          />
        </Form.Item>
        <div className="flex items-end gap-2">
          <Form.Item
            label={labels.reviewCriteria}
            className="w-full"
            name="reviewCriteria"
          >
            <Input placeholder={placeHolder.reviewcriteria} size="large" />
          </Form.Item>
          <Button
            icon={<PlusOutlined />}
            title="Add"
            className="ThemeBtn mb-2 flex"
            onClick={handleAddCriteria}
          ></Button>
        </div>
        <List
          className="!mb-5 reviewCriteriaListing"
          bordered={true}
          size="small"
          itemLayout="horizontal"
          dataSource={reviewCriteria}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.question}
                description={
                  item?.remove ? (
                    <p
                      onClick={() => handleDeleteCriteria(item.id)}
                      className="text-amber-800"
                    >
                      Delete
                    </p>
                  ) : (
                    ""
                  )
                }
              />
            </List.Item>
          )}
        />

        <Form.Item area="true" label={labels.attachments} name="attachment">
          {/* <SingleUpload
            handleImageUpload={(val) => {
              setAttachment(val);
            }}
            img="Add Image"
            position="flex-start"
            uploadText={labels.upload}
          /> */}
          <SingleUpload
            handleImageUpload={handleImageUpload}
            img="Add Image"
            position="flex-start"
            uploadText={labels.upload}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            loading={createLoader}
          >
            {labels.createJob}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
