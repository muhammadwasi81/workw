import { Dropdown, Form, Input } from "antd";
import React, { useState, useCallback } from "react";
import ImageReader from "../../../sharedComponents/ImageReader/ImageReader";
import UserSearchable from "../../../sharedComponents/UserSearchable/UserSearchable";
import PollFields from "./PollFields";
import PostTitleField from "./PostTitleField";
import {useDispatch} from "react-redux";
import {onFeedCreateSubmitAction} from "../store/slice";

const defaultAttachmentState = [{ type: 0, file: "" }];

const ComposerForm = (props) => {
  const dispatcher = useDispatch()
  const { setShareWith } = props;
  const [formRef] = Form.useForm();
  const [uploadedFiles, setFiles] = useState([]);
  const [fieldsType, setFieldsType] = useState("postDetails");

  const onFinish = (e) => {
    console.log(e);
    formRef.resetFields();
  };

  const getTagUser = (e) => {
    console.log("aksjdhajsdkjashdas", e)
    setShareWith(e);
  };

  const filePicker = (e) => {
    const file = e.target.files;
    //  check if file is an image
    if (file) {
      setFiles([...uploadedFiles, ...file]);
    } else {
      setFiles(null);
    }
  };

  // remove array index by index
  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const options = [
    {
      name: "Lucy",
      jobTitle: "HR Manager",
    },
    {
      name: "Jack",
      jobTitle: "UI/UX Designer",
    },
    {
      name: "John",
      jobTitle: "Group CEO",
    },
  ];

  const menu = (
    <>
      <div className="dropdown-wrapper">
        <div>
          <img
            src="https://konnect.im/static/media/world.f69f1142.svg"
            alt=""
          />
          <span>Public</span>
        </div>
        <div>
          <img
            src="https://konnect.im/static/media/padlock.35a2d6ca.svg"
            alt=""
          />
          <span>Public</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Form form={formRef} onFinish={onFinish}>
        {fieldsType === "postDetails" ? (
          <PostTitleField />
        ) : (
          <PollFields setFieldsType={setFieldsType} />
        )}
        {uploadedFiles.length > 0 && (
          <div className="preview-file">
            {uploadedFiles?.map((file, index) => (
              <ImageReader
                removeFile={() => removeFile(index)}
                key={index}
                file={file}
              />
            ))}
          </div>
        )}
        <div className="select-users">
          <div className="badge">Write</div>
          <Form.Item name={"tagUsers"} className="c-multi-select">
            <UserSearchable data={options} onChange={(e) => getTagUser(e)} />
          </Form.Item>
        </div>
        <div className="uploader">
          <div className="options">
            <input
              onChange={(e) => filePicker(e)}
              accept=".jpg, .jpeg, .gif, .bmp, .png, .mp4"
              multiple
              type="file"
            />
            <div className="wrapper">
              <img
                src="https://konnect.im/static/media/image.002df348.svg"
                alt=""
              />{" "}
              <span>Photo/Video</span>
            </div>
          </div>
          <div className="options">
            <input
              onChange={(e) => filePicker(e)}
              multiple
              accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
              type="file"
            />
            <div className="wrapper">
              <img
                src="https://konnect.im/static/media/contract.eb367011.svg"
                alt=""
              />{" "}
              <span>Documents</span>
            </div>
          </div>
          <div onClick={() => setFieldsType("poll")} className="options">
            <div className="wrapper">
              <img
                src="https://konnect.im/static/media/ballot.ad2d2fc5.svg"
                alt=""
              />{" "}
              <span>Poll</span>
            </div>
          </div>
        </div>
        <div className="submit-wrapper">
          <Dropdown trigger={["click"]} overlay={menu}>
            <button className="dropdown-button">
              <img
                src="https://konnect.im/static/media/world.f69f1142.svg"
                alt=""
              />
            </button>
          </Dropdown>
          <button className="post-form" type="submit" onClick={() => dispatcher(onFeedCreateSubmitAction())}>
            Post
          </button>
        </div>
      </Form>
    </>
  );
};

export default ComposerForm;
