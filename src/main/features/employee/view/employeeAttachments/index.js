import { Divider, Form, Button, Select, Image, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import FileUploader from "../../../Messenger/view/MessengerBox/components/fileUploader";
import { EmployeeDetailAttachmentTypeEnum } from "./enum";
import { EditOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.css";
import { useParams } from "react-router-dom";
import { STRINGS } from "../../../../../utils/base";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployeeDetailAttachment,
  getAllEmployeeDetailAttachment,
  removeEmployeeDetailAttachment,
} from "../../store/actions";

const EmployeeAttachments = () => {
  const [form] = Form.useForm();
  const param = useParams();
  const dispatch = useDispatch();
  const { employee, attachmentLoader, success, attachments } = useSelector(
    (state) => state.employeeSlice
  );
  const [attachmentImage, setAttachmentImage] = useState([]);
  const imageUpload = (att) => {
    console.log(att);
    setAttachmentImage(att);
  };

  useEffect(() => {
    dispatch(getAllEmployeeDetailAttachment(param.id));
  }, []);

  useEffect(() => {
    if (success) {
      form.resetFields();
      setAttachmentImage([]);
    }
  }, [success]);

  console.log(employee);

  const onClickDelete = (id) => {
    //TODO: delete dispatch here and add loader in screen

    dispatch(removeEmployeeDetailAttachment(id));
  };

  const items = (id) => {
    return [
      {
        key: "1",
        label: (
          <div onClick={() => onClickDelete(id)}>
            <DeleteOutlined /> Delete
          </div>
        ),
      },
    ];
  };

  const handleSubmit = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        const payload = {
          userId: param.id,
          type: form.getFieldValue("type"),
          attachment: {
            id: STRINGS.DEFAULTS.guid,
            file: attachmentImage[0],
          },
        };
        console.log(payload);
        //TODO:  dispatch add attachments and then reset fields and image in upload box
        dispatch(addEmployeeDetailAttachment(payload));
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div className="employeeForm">
      <Divider orientation="left">Employee Attachments</Divider>
      <Form name="Attachment" layout={"vertical"} form={form}>
        <Form.Item
          label={"Attachment Type"}
          name="type"
          rules={[
            {
              required: true,
              message: "Attachment Type Required",
            },
          ]}
        >
          <Select placeholder={"Attachment Type"} size="large">
            {EmployeeDetailAttachmentTypeEnum.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          area="true"
          label="Attachment"
          rules={[
            {
              required: true,
              message: "Attachment Required",
            },
          ]}
        >
          <FileUploader
            url={""}
            value={""}
            // fileList={rebateImage ? rebateImage : []}
            uploadButton={<div>Upload</div>}
            handleUpload={(att) => imageUpload(att)}
            isMultiple={false}
            classes=""
          />
        </Form.Item>
      </Form>
      <div className={"editButtons"}>
        <Button
          className="btn ThemeBtn"
          style={{ marginLeft: "auto" }}
          icon={<EditOutlined />}
          onClick={handleSubmit}
          loading={attachmentLoader ? true : false}
        >
          Add Attachment
        </Button>
      </div>
      {employee.attachments.length > 0 && (
        <div className="mt-8">
          <Divider orientation="left"> Attachments</Divider>
          <div className="flex w-full gap-5 flex-wrap mt-4 mb-2 content-center">
            {employee.attachments.map((item) => {
              return (
                <div className="flex">
                  <div className="image-card ">
                    <div className="image-top mb-4">
                      {/* <Image
                        width={240}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        // src={item.attachment}
                      /> */}
                      <img
                        src={
                          item.attachment
                            ? item.attachment
                            : "https://asvs.in/wp-content/uploads/2017/08/dummy.png"
                        }
                        alt=""
                        className="w-[250px] h-[250px]"
                      />
                    </div>
                    <div className="flex justify-center ">
                      <span className="font-bold text-base">
                        {EmployeeDetailAttachmentTypeEnum.map((it) => {
                          if (it.value === item.type) {
                            return it.label;
                          }
                        })}
                      </span>
                    </div>
                    <div className="flex justify-end relative bottom-5">
                      <Dropdown
                        menu={{
                          items: items(item.id),
                        }}
                        placement="bottomLeft"
                        arrow
                      >
                        <MoreOutlined className="text-lg" />
                      </Dropdown>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttachments;
