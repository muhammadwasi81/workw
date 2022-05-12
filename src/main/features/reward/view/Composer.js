import { Form, Input, Option } from 'antd'
import React, { useEffect, useState, useContext } from 'react'
import TextInput from '../../../../components/SharedComponent/Input/TextInput';
import Button from '../../../../components/SharedComponent/button/index'
import Select from '../../../../components/SharedComponent/Select/Select';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEmployee, getRewardCategory } from '../../../../utils/Shared/store/actions';
import { addReward } from '../store/actions';
import SingleUpload from '../../../sharedComponents/Upload/singleUpload';
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import {
	uploadImage,
} from "../../../../utils/Shared/store/actions";
import NewCustomSelect from '../../employee/view/newCustomSelect'



const Composer = props => {

  const dispatch = useDispatch()

  const [form] = Form.useForm();

  const [profileImage, setProfileImage] = useState(null);

  const { rewardCategories, employeesList } = useSelector(
		state => state.sharedSlice
	);

    

  useEffect(() => {
		dispatch(getRewardCategory());
    // dispatch(getAllEmployee());
    console.log(employeesList, "EMPLOYEES")
	}, []);

  const handleImageUpload = data => {
		setProfileImage(data);
	};

  const onFinish = (v) => {
      form.resetFields();

      // let members = v.cityId.map((city)=>{
      //   return {
      //     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      //     "memberId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      //     "memberType": 0
      //   }
      // })

    console.log(v, "OBJECT")

      dispatch(uploadImage(profileImage)).then(x => {
        console.log(x.payload.data[0].id, "Hurry i got image if from server")
        let photoId = x.payload.data[0].id;

        let payload = { ...v, imageId: photoId,  };
        dispatch(addReward(payload))


        console.log(payload, "Final Data")

      });
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const { userLanguage } = useContext(LanguageChangeContext);
	const { employees, Direction } = dictionaryList[userLanguage];
	const value = employees.EmployeeForm;
  const placeholder = employees.placeholders;

  return (
    <>
      <Form 
        form={form}
        name="addReward"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <Form.Item
          label="Award Name"
          name="name"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: "Please Enter Award Name!",
            }
          ]}
        >
          <TextInput placeholder="Enter Award Name" /> 
        </Form.Item>

        <Form.Item
          label="Reason for Award"
          name="reason"
          rules={[
            {
              required: true,
              message: "Please Enter Reason for Award",
            }
          ]}
        >
          <TextInput placeholder="Enter Award Reason" /> 
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please Enter Description",
            }
          ]}
        >
          <Input.TextArea placeholder='Enter Description' />
        </Form.Item>
        
         <Form.Item 
          label="Select Category"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Please Enter Category",
            }
          ]}
          >
          <Select
            // value={
            //   "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            // }
            data={rewardCategories}
            placeholder="Category"
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="members"
					label={"Search Memebers"}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
        >
          <NewCustomSelect
						name="members"
						label={"Search Memebers"}
						showSearch={true}
						direction={Direction}

            mode="multiple"

						endPoint="GetAllUserReference"
						requestType="post"
						placeholder={"Search Memebers"}
					/>
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
            position="flex-start"
					/>
        </Form.Item>

{/*
        <Form.Item 
          label="Award To"
          name="members"
          rules={[
            {
              required: true,
              message: "Please Select Members",
            }
          ]}
          >
          <Select
            showSearch
            size="large"
            placeholder="Search Members"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
        </Form.Item>

        <Form.Item 
          label="Approvers"
          name="approvers"
          rules={[
            {
              required: true,
              message: "Please Select Approvers",
            }
          ]}
          >
          <Select
            showSearch
            size="large"
            placeholder="Search Approvers"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
        </Form.Item> */}

        <Form.Item>
          <Button buttonClass="submitButton" htmlType="submit" title="Create Reward" > Create Reward </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Composer