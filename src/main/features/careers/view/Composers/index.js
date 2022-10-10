import React, { useEffect, useState } from "react";
import { Avatar, Button, DatePicker, Form, Input, List, Select } from "antd";
import { useDispatch } from "react-redux";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { getAllJobDescriptionService } from "../../../jobDescription/services/service";
import { getAllDepartmentService } from "../../../departments/services/service";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { createGuid, getNameForImage } from "../../../../../utils/base";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import {
  getAllEmployees,
  getCities,
} from "../../../../../utils/Shared/store/actions";
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

const Composer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // const [designation, setDesignation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [reviewCriteria, setReviewCriteria] = useState([]);
  const { cities } = useSelector((state) => state.sharedSlice);
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

  const {
    designationSlice: { designations },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllDesignation());
  }, []);

  const getDepartment = async () => {
    const { responseCode, data } = await getAllDepartmentService();
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
    // getDesigantion();
    getDepartment();
    getReviewCriteria();
  }, []);

  const onFinish = (values) => {
    console.log(values, "values");
    let payload = {
      ...values,
      endDate:values.endDate.format(),
      members:values.members.map(memberId=>({memberId})),
      approvers:values.approvers.map(approverId=>({approverId}))
    }
    dispatch(addCareer(payload))
    // form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="createCareer"
        className="createCareer"
        // initialValues={initialState}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label={"Designation"}
          name="designationId"
          rules={[
            {
              required: true,
              message: "Please Enter Designation",
            },
          ]}
        >
          <Select placeholder={"Select Designtion"} size="large">
            {designations.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={"Job Description"}
          name="description"
          rules={[
            {
              required: true,
              message: "Enter Job Description",
            },
          ]}
        >
          <Input.TextArea placeholder={"Job Description"} />
        </Form.Item>
        <div className="salaryRangeInputs">
          <Form.Item
            label="Range Of Salary"
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name="minSalary"
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
                placeholder="Enter Minimum Salary"
                type="number"
              />
            </Form.Item>
            <Form.Item
              name="maxSalary"
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
                placeholder="Enter Maximum Salary"
                type="number"
              />
            </Form.Item>
          </Form.Item>
        </div>
        <Form.Item
          label={"Department"}
          name="departmentId"
          rules={[
            {
              required: true,
              message: "Please Enter Department",
            },
          ]}
        >
          <Select placeholder={"Select Department"} size="large">
            {department.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={"Supervisor"}
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
            placeholder={"Select Supervisor"}
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
          label={"Interviewers"}
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
            placeholder={"Select Interviewers"}
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
          label={"Post Interviewers"}
          name="postInterviewers"
          rules={[
            {
              required: true,
              message: "Please Select Post Interviewers",
            },
          ]}
        >
          <MemberSelect
            name="postInterviewers"
            mode="multiple"
            formitem={false}
            placeholder={"Select Post Interviewers"}
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
          label={"Hiring Buddy"}
          name="hiringBuddyId"
          rules={[
            {
              required: true,
              message: "Please Select Buddy",
            },
          ]}
        >
          <MemberSelect
            name="hiringBuddyId"
            mode="multiple"
            formitem={false}
            placeholder={"Select Buddy"}
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
          name="members"
          label={"Job Viewer"}
          rules={[{ required: true }]}
        >
          <MemberSelect
            name="members"
            mode="multiple"
            formitem={false}
            placeholder={"Select Members"}
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
          name="approvers"
          label={"Approvers"}
          showSearch={true}
          rules={[{ required: true }]}
        >
          <MemberSelect
            name="approvers"
            mode="multiple"
            formitem={false}
            placeholder={"Select Approvers"}
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
          placeholder={"Select City"}
          size="large"
          name="cityId"
          label={"City"}
          rules={[{ required: true }]}
        />
        <Form.Item
          name="skillTags"
          label="Skills"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select size="large" placeholder="Add Skills" mode="tags" />
        </Form.Item>
        <Form.Item
          name="experience"
          label="Experience (Years)"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input size="large" placeholder="Write Years" type="number" />
        </Form.Item>

        <div className="w-full flex gap-3 mb-2">
          <Form.Item
            className="w-2/4"
            label={"Job Type"}
            name="jobType"
            rules={[
              {
                required: true,
                message: "Please Enter Job Type",
              },
            ]}
          >
            <Select placeholder={"Select Job Type"} size="large">
              {JobTypeEnum.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="w-2/4"
            label={"Job Shift"}
            name="jobShift"
            rules={[
              {
                required: true,
                message: "Please Enter Job Shift",
              },
            ]}
          >
            <Select placeholder={"Select Job Shift"} size="large">
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
            label={"Education"}
            name="education"
            rules={[
              {
                required: true,
                message: "Please Select Education",
              },
            ]}
          >
            <Select placeholder={"Please Select Education"} size="large">
              {EducationTypeEnum.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="w-2/4"
            label={"Career Level"}
            name="careerLevel"
            rules={[
              {
                required: true,
                message: "Please Enter Career Level",
              },
            ]}
          >
            <Select placeholder={"Select Career Level"} size="large">
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
          label="End Date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            size="large"
            className="w-full"
            placeholder="Select End Date"
          />
        </Form.Item>
        <div className="flex items-end gap-2">
          <Form.Item
            label={"Review Criteria"}
            className="w-full"
            name="reviewCriteria"
          >
            <Input placeholder={"Enter Review Criteria"} size="large" />
          </Form.Item>
          <Button
            icon={<PlusOutlined />}
            title="Add"
            className="ThemeBtn mb-2 flex"
            onClick={handleAddCriteria}
          ></Button>
        </div>
        <List
          className="!mb-5"
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

        <Form.Item area="true" label="Attachment">
          <SingleUpload
            handleImageUpload={() => { }}
            img="Add Image"
            position="flex-start"
            uploadText={"Upload"}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
          >
            Create Job
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
