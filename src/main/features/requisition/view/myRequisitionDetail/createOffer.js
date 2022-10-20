import { Button, Form, Input, Avatar, InputNumber } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { addRequisitionOffer } from "../../store/actions";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { requisitionDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { STRINGS } from "../../../../../utils/base";
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
                className={Direction === "rtl" ? "labelRight" : ""}
                style={{direction: Direction}}
            >

                <Form.Item
                    label={requisitionDictionary.name}
                    name="name"
                    labelPosition="top"
                    rules={[
                        {
                            required: true,
                            message: requisitionDictionary.PleaseEnterRequisitionName,
                        },
                    ]}>
                    <TextInput placeholder={requisitionDictionary.PleaseEnterRequisitionName} />
                </Form.Item>

                <Form.Item
                    label={requisitionDictionary.Email}
                    name="email"
                    labelPosition="top"
                    rules={[
                        {
                            required: true,
                            message: requisitionDictionary.PleaseEnterEmail,
                        },
                    ]}>
                    <TextInput placeholder={requisitionDictionary.PleaseEnterEmail} />
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
                    label={requisitionDictionary.PhoneNumber}
                    name="phoneNumber"
                    labelPosition="top"
                    rules={[
                        {
                            required: true,
                            message: requisitionDictionary.PleaseEnterPhoneNumber,
                        },
                    ]}>
                    <TextInput placeholder={requisitionDictionary.PleaseEnterPhoneNumber} />
                </Form.Item>

                <Form.Item
                    label={requisitionDictionary.BusinessName}
                    name="businessName"
                    labelPosition="top"
                    rules={[
                        {
                            required: true,
                            message: requisitionDictionary.PleaseEnterBusinessName,
                        },
                    ]}>
                    <TextInput placeholder={requisitionDictionary.PleaseEnterBusinessName} />
                </Form.Item>

                <Form.Item
                    label={requisitionDictionary.BusinessAddress}
                    name="businessAddress"
                    rules={[
                        {
                            required: true,
                            message: requisitionDictionary.PleaseEnterBusinessAddress,
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder={requisitionDictionary.PleaseEnterBusinessAddress}
                    />
                </Form.Item>

                <Form.Item
                    label={requisitionDictionary.Offer}
                    name="offer"
                    rules={[
                        {
                            required: true,
                            message: requisitionDictionary.PleaseEnterOffer,
                        },
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        size={'large'}
                        placeholder={requisitionDictionary.PleaseEnterOffer}
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
                        title={requisitionDictionary.CreateOffer}
                    >
                        {" "}
                        {requisitionDictionary.CreateOffer}{" "}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateOffer;
