import React, { useContext, useEffect, useState } from "react";
// import SharedButton from "../../../SharedComponent/button";
import mailMinimizeIcon from "../assests/mailMinimizeIcon.svg";
import mailMinimizeOut from "../assests/mailMinimizeOut.svg";
import mailResizeIcon from "../assests/mailResizeIcon.svg";
import closeMailIcon from "../assests/closeMailIcon.svg";
import { Button, Form, Input, message } from "antd";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import Quill from "quill";
import { useDispatch, useSelector } from "react-redux";
import { handleMailComposerClose } from "../Store/MailSlice";
import SearchAndSelectInput from "./searchAndSelectInput";
import { composeMail } from "../Store/Api";
import SharedButton from "../../../sharedComponents/button";
import EmailMemberSelect from "./EmailMemberSelect";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { unwrapResult } from "@reduxjs/toolkit";

const composerBtnStyle = {
  backgroundColor: "var(--currentThemeColor)",
  borderRadius: "8px",
  color: "#fff",
  padding: "5px 10px",
  height: "unset",
  float: "right",
  marginRight: "7px",
  marginLeft: "7px",
  marginBottom: "10px",
};
const ComposeMailBox = ({
  instance: { id, isMax, isMinimize, isReply, isForward, data },
  i,
  handleMaxToMin,
  handleMinimize,
}) => {
  const dispatch = useDispatch();
  const [QuillInstance, setQuillInstance] = useState(null);
  const { user } = useSelector((state) => state.userSlice);
  const [isBcc, setBcc] = useState(false);
  const [isCc, setCc] = useState(false);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { mail } = dictionaryList[userLanguage];
  const [selectedTOEmail, setSelectedTOEmail] = useState([]);
  const [selectedBcEmail, setSelectedBcEmail] = useState([]);
  const [selectedCcEmail, setSelectedCcEmail] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ list: "ordered" }, { list: "bullet" }],
    ["image"],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    [{ font: [] }],
  ];

  useEffect(() => {
    const quillInstance = new Quill(`#editor${i}`, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    setQuillInstance(quillInstance);
  }, []);

  const handleToMailSelected = (arr) => setSelectedTOEmail(arr);

  const handleBccMailSelected = (arr) => setSelectedBcEmail(arr);

  const handleCcMailSelected = (arr) => setSelectedCcEmail(arr);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const isValidate = (dataObj) => {
    let valid = { error: false, message: "" };

    if (dataObj.to.length === 0) {
      valid.error = true;
      valid.message += valid.message
        ? "\nEnter one recipient."
        : "Enter one recipient.";
    }

    if (dataObj.to.length > 0) {
      dataObj.to.forEach((value) => {
        if (!validateEmail(value.address)) {
          valid.error = true;
          valid.message += valid.message
            ? `\nInvalid email ${value.email}.`
            : `Invalid email ${value.email}.`;
        }
      });
    }
    if (dataObj.cc.length > 0) {
      dataObj.cc.forEach((value) => {
        if (!validateEmail(value.address)) {
          valid.error = true;
          valid.message += valid.message
            ? `\nInvalid email ${value.address}.`
            : `Invalid email ${value.address}.`;
        }
      });
    }
    if (dataObj.bcc.length > 0) {
      dataObj.bcc.forEach((value) => {
        if (!validateEmail(value.address)) {
          valid.error = true;
          valid.message += valid.message
            ? `\nInvalid email ${value.address}.`
            : `Invalid email ${value.address}.`;
        }
      });
    }
    if (!dataObj.subject) {
      valid.error = true;
      valid.message += `\nSubject Required.`;
    }
    return valid;
  };
  const onFinish = (val) => {
    val.content = `${QuillInstance.root.innerHTML}`;
    const dataObj = {
      id: 0,
      to: selectedTOEmail
        ? selectedTOEmail.map((value) => ({
            name: value?.split("@")[0],
            address: value,
          }))
        : [],
      from: [
        {
          name: user.firstName,
          address: user.email ? user.email : "salman@miletap.com",
        },
      ],
      cc: selectedCcEmail
        ? selectedCcEmail.map((value) => ({
            name: value?.split("@")[0],
            address: value,
          }))
        : [],
      bcc: selectedBcEmail
        ? selectedBcEmail.map((value) => ({
            name: value?.split("@")[0],
            address: value,
          }))
        : [],
      subject: val.subject ? val.subject : "",
      content: val.content,
      isRead: false,
      hasAttachments: false,
      date: "2022-01-21T13:56:14.064Z",
    };
    let validate = isValidate(dataObj);
    if (validate.error) {
      //here we get the validation error
      dispatch(
        openNotification({
          type: "error",
          message: validate.message,
        })
      );
      // alert(validate.message);
    } else {
      //Here we hit the send mail api
      setLoading(true);
      message.loading("Email Sending..", 2, async () => {
        try {
          const resultAction = await dispatch(composeMail(dataObj));
          const originalPromiseResult = unwrapResult(resultAction);
          if (originalPromiseResult?.data) {
            message.success("Email Sent Successfully.");
            dispatch(handleMailComposerClose(id));
            setLoading(false);
          }
        } catch (rejectedValueOrSerializedError) {
          setLoading(false);
          message.error("Error on mail sending");
        }
      });
    }
  };

  const handleCloseComposer = () => {
    dispatch(handleMailComposerClose(id));
  };

  const getDefaultSubject = () => {
    if(isReply){
      return "RE : "+ data.subject
    }
    else if(isForward){
      return data.subject
    }
    else{
      return ""
    }
  }

  return (
    <div
      className={`${
        isMax ? "mail-composer-containerMax" : "mail-composer-container"
      } ${isMinimize ? "mail-composer-containerMin" : ""}`}
    >
      <div className="mail-composer-head">
        <div>{mail.newMessage}</div>
        <div>
          <div>
            <SharedButton
              type="default"
              shape="circle"
              size="small"
              onClick={() => handleMinimize(!isMinimize, id)}
              icon={mailMinimizeIcon}
              IconSize={12}
              disabled={isMax}
              style={{
                backgroundColor: "var(--currentThemeColor)",
                border: "none",
              }}
            />
          </div>
          <div>
            <SharedButton
              type="default"
              shape="circle"
              size="small"
              onClick={() => handleMaxToMin(!isMax, id)}
              icon={isMax ? mailMinimizeOut : mailResizeIcon}
              IconSize={11}
              disabled={isMinimize}
              style={{
                backgroundColor: "var(--currentThemeColor)",
                border: "none",
              }}
            />
          </div>
          <div>
            <SharedButton
              type="default"
              shape="circle"
              size="small"
              onClick={() => handleCloseComposer()}
              icon={closeMailIcon}
              IconSize={10}
              style={{
                backgroundColor: "var(--currentThemeColor)",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>

      <div className="composer-box" style={{ display: isMinimize && "none" }}>
        <Form
          form={form}
          name="mailCompose"
          onFinish={onFinish}
          layout="vertical"
          style={{
            display: "flex",
            height: "max-content",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Form.Item>
            <SearchAndSelectInput
              handleGetSelected={handleToMailSelected}
              placeholder={"To"}
              disabled={isReply}
              defaultValue={data.from.map(item=>item.address)}
            />
          </Form.Item>

          {/* <EmailMemberSelect /> */}

          {isBcc && (
            <Form.Item>
              <SearchAndSelectInput
                handleGetSelected={handleBccMailSelected}
                placeholder={"Bcc"}
              />
            </Form.Item>
          )}

          {isCc && (
            <Form.Item>
              <SearchAndSelectInput
                handleGetSelected={handleCcMailSelected}
                placeholder={"Cc"}
              />
            </Form.Item>
          )}

          <Form.Item name="subject">
            <Input
              placeholder="Subject"
              prefix={null}
              size={"middle"}
              style={{ borderRadius: 4, outline: "none" }}
              disabled={isReply}
              defaultValue={getDefaultSubject}
            />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                fontWeight: isBcc && "900",
                color: isBcc && "var(--currentThemeColor)",
              }}
              onClick={() => setBcc(!isBcc)}
            >
              Bcc
            </div>
            <div
              style={{
                cursor: "pointer",
                fontWeight: isCc && "900",
                color: isCc && "var(--currentThemeColor)",
              }}
              onClick={() => setCc(!isCc)}
            >
              Cc
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
            }}
          >
            <div
              id={`editor${i}`}
              style={{
                border: "1px solid #d9d9d9 !important",
                borderRadius: 4,
              }}
            />
          </div>

          <Form.Item className="composer-box-toolArea">
            <SharedButton
              htmlType="submit"
              type="default"
              title={"Send"}
              loading={loading}
              style={composerBtnStyle}
              buttonClass={"btn-hover"}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ComposeMailBox;
