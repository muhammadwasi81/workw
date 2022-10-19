import { Button, Form, Input, Avatar, InputNumber } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { addRequisitionOffer } from "../../store/actions";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { requisitionDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { getNameForImage, STRINGS } from "../../../../../utils/base";
import { useParams } from "react-router-dom";

const initialState = {
    id: "",
    name: "",
    reason: "",
    description: "",
    categoryId: "",
    imageId: "",
    finalApprovers: [
        {
            approverId: "",
            approverType: 0,
        },
    ],
    approvers: [
        {
            approverId: "",
            approverType: 0,
            isDefault: true,
            status: 1,
            email: "",
        },
    ],
};

const CreateOffer = props => {
    const { id } = useParams();
    const { userLanguage } = useContext(LanguageChangeContext);
    const { Direction, requisitionDictionary } = requisitionDictionaryList[userLanguage];

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [profileImage, setProfileImage] = useState(null);

    const { success } = useSelector(state => state.requisitionSlice);

    const handleImageUpload = data => {
        setProfileImage(data);
    };

    const onFinish = (values) => {
        let image = {
            id: STRINGS.DEFAULTS.guid,
            file: profileImage && profileImage[0]?.originFileObj,
        };

        if (Object.keys(image).length > 0) {
            let payload = { ...values, image, requisitionId: id };
            dispatch(addRequisitionOffer(payload));
        } else {

            let payload = {...values, requisitionId: id }
            dispatch(addRequisitionOffer(payload));
        }
    };
    useEffect(() => {
        if (success) {
            form.resetFields();
        }
    }, [success]);

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Form
                form={form}
                name="addRequisitionOffer"
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
                    label={requisitionDictionary.name}
                    name="name"
                    labelPosition="top"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Name",
                        },
                    ]}>
                    <TextInput placeholder={"Please Enter Name"} />
                </Form.Item>

                <Form.Item
                    label={"Email"}
                    name="email"
                    labelPosition="top"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Email",
                        },
                    ]}>
                    <TextInput placeholder={"Please Enter Email"} />
                </Form.Item>

                <Form.Item
                    label={requisitionDictionary.description}
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: requisitionDictionary.enterDescription,
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder={requisitionDictionary.enterDescription}
                    />
                </Form.Item>

                <Form.Item
                    label={"Phone Number"}
                    name="phoneNumber"
                    labelPosition="top"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Contact Number",
                        },
                    ]}>
                    <TextInput placeholder={"Please Enter Contact Number"} />
                </Form.Item>

                <Form.Item
                    label={"Business Name"}
                    name="businessName"
                    labelPosition="top"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Business Name",
                        },
                    ]}>
                    <TextInput placeholder={"Please Enter Business Name"} />
                </Form.Item>

                <Form.Item
                    label={"Business Address"}
                    name="businessAddress"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Business Address",
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder={requisitionDictionary.enterDescription}
                    />
                </Form.Item>

                <Form.Item
                    label={"Offer"}
                    name="offer"
                    rules={[
                        {
                            required: true,
                            message: "Enter Offer",
                        },
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        size={'large'}
                        placeholder={"Enter Offfer"}
                    />
                </Form.Item>

                <Form.Item area="true">
                    <SingleUpload
                        handleImageUpload={handleImageUpload}
                        img="Add Image"
                        position="flex-start"
                        uploadText={requisitionDictionary.upload}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        size="medium"
                        className="ThemeBtn"
                        block
                        htmlType="submit"
                        title={"Create Requisition"}
                    >
                        {" "}
                        {"Create Requisition"}{" "}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateOffer;
