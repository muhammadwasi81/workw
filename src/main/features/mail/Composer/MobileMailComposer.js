import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openMailMobComposer } from "../Store/MailSlice";
import mailAttachmentIcon from "../assests/mailAttachmentIcon.svg";
// import SharedButton from "../../../SharedComponent/button";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import SearchAndSelectInput from "./searchAndSelectInput";
import Quill from "quill";
import { composeMail } from "../Store/Api";
import SharedButton from "../../../sharedComponents/button";

const MobileMailComposer = () => {
  const dispatch = useDispatch();
  const [isBcc, setBcc] = useState(false);
  const [isCc, setCc] = useState(false);
  const [QuillInstance, setQuillInstance] = useState(null);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { user } = useSelector((state) => state.userSlice);
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
    const quillInstance = new Quill(`#editor`, {
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

  const handleComposer = (status) => {
    dispatch(openMailMobComposer(status));
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

  return (
    <React.Fragment>
      <div className="composer-box">
        <Form
          form={form}
          name="mailCompose"
          onFinish={onFinish}
          layout="vertical"
          style={{
            display: "flex",
            height: "calc(100%)",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <div className="mail-mob-header">
            <div className="mail-drawer-menu">
              <SharedButton
                type="default"
                shape="round"
                size="middle"
                onClick={() => handleComposer(false)}
                title={mail.close}
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </div>

            <div className="mail-drawer-edit">
              <Form.Item className="composer-box-toolArea">
                <Button type="primary" htmlType="submit">
                  {/*Submit*/}
                </Button>

                <SharedButton
                  type="default"
                  htmlType="submit"
                  shape="round"
                  size="middle"
                  title={mail.send}
                  style={{ backgroundColor: "#1b5669", color: "#fff" }}
                />
              </Form.Item>
            </div>
          </div>

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
              id={`editor`}
              style={{
                border: "1px solid #f5f5f5 !important",
                borderRadius: 4,
              }}
            />
          </div>

          {/*<Form.Item className="composer-box-toolArea">*/}
          {/*    <Button type="primary" htmlType="submit">*/}
          {/*        Submit*/}
          {/*    </Button>*/}
          {/*</Form.Item>*/}
        </Form>
      </div>

      {/*<div className="composer-box">
                    <div>
                        <Input placeholder=""
                               prefix={suffixTo}
                               size={"middle"}/>
                    </div>
                    <div>
                        <Input placeholder=""
                               prefix={suffixSub}
                               suffix={subjectSuffix}
                               size={"middle"}/>
                    </div>
                    <div>
                        <Input placeholder=""
                               prefix={suffixCcBcc}
                               size={"middle"}/>
                    </div>
                    <div className="composer-box-body">
                        <TextArea placeholder=""
                                  autoSize
                                  bordered={false}/>
                    </div>
                </div>*/}
    </React.Fragment>
  );
};
export default MobileMailComposer;
