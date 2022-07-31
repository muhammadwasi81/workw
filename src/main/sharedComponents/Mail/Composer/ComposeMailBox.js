import React, { useContext, useEffect, useState } from "react";
import SharedButton from "../../../SharedComponent/button";
import mailMinimizeIcon from "../assests/mailMinimizeIcon.svg";
import mailMinimizeOut from "../assests/mailMinimizeOut.svg";
import mailResizeIcon from "../assests/mailResizeIcon.svg";
import closeMailIcon from "../assests/closeMailIcon.svg";
import { Button, Form, Input } from "antd";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import Quill from "quill";
import { useDispatch, useSelector } from "react-redux";
import { handleMailComposerClose } from "../Store/MailSlice";
import SearchAndSelectInput from "./searchAndSelectInput";
import { composeMail } from "../Store/Api";

const composerBtnStyle = {
  backgroundColor: "var(--primary_theme_color_green)",
  borderRadius: "8px",
  color: "#fff",
  // outline: "none",
  // marginRight: 10,
  // display: "flex",
  // alignItems: "center"
};
const ComposeMailBox = ({
  instance: { id, isMax, isMinimize },
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

  let selectedTOEmail = [];

  let selectedBcEmail = [];

  let selectedCcEmail = [];

  const handleToMailSelected = (arr) => {
    selectedTOEmail = arr;
  };
  const handleBccMailSelected = (arr) => {
    selectedBcEmail = arr;
  };
  const handleCcMailSelected = (arr) => {
    selectedCcEmail = arr;
  };

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
        if (!validateEmail(value.email)) {
          valid.error = true;
          valid.message += valid.message
            ? `\nInvalid email ${value.email}.`
            : `Invalid email ${value.email}.`;
        }
      });
    }
    if (dataObj.cc.length > 0) {
      dataObj.cc.forEach((value) => {
        if (!validateEmail(value.email)) {
          valid.error = true;
          valid.message += valid.message
            ? `\nInvalid email ${value.email}.`
            : `Invalid email ${value.email}.`;
        }
      });
    }
    if (dataObj.bcc.length > 0) {
      dataObj.bcc.forEach((value) => {
        if (!validateEmail(value.email)) {
          valid.error = true;
          valid.message += valid.message
            ? `\nInvalid email ${value.email}.`
            : `Invalid email ${value.email}.`;
        }
      });
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
            email: value,
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
            email: value,
          }))
        : [],
      bcc: selectedBcEmail
        ? selectedBcEmail.map((value) => ({
            name: value?.split("@")[0],
            email: value,
          }))
        : [],
      subject: val.subject ? val.subject : "",
      content: val.content,
      isRead: false,
      hasAttachments: true,
      date: "2022-01-21T13:56:14.064Z",
    };
    let validate = isValidate(dataObj);
    if (validate.error) {
      //here we get the validation error
      alert(validate.message);
    } else {
      //Here we hit the send mail api
      console.log(dataObj, val);
      dispatch(composeMail(dataObj));
    }
  };

  const handleCloseComposer = () => {
    dispatch(handleMailComposerClose(id));
  };

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
                backgroundColor: "var(--primary_theme_color_green)",
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
                backgroundColor: "var(--primary_theme_color_green)",
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
                backgroundColor: "var(--primary_theme_color_green)",
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
            height: "425px",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Form.Item>
            <SearchAndSelectInput
              handleGetSelected={handleToMailSelected}
              placeholder={"To"}
            />
          </Form.Item>

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
                color: isBcc && "var(--primary_theme_color_green)",
              }}
              onClick={() => setBcc(!isBcc)}
            >
              Bcc
            </div>
            <div
              style={{
                cursor: "pointer",
                fontWeight: isCc && "900",
                color: isCc && "var(--primary_theme_color_green)",
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
                border: "1px solid #f5f5f5 !important",
                borderRadius: 4,
              }}
            />
          </div>

          <Form.Item className="composer-box-toolArea">
            <SharedButton
              htmlType="submit"
              type="default"
              title={"Submit"}
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
