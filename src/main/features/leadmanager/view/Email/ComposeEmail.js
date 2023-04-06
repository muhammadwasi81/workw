import { Button, Input } from "antd";
import React, { useContext } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { LeadManagerDictionary } from "../../localization";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

import CustomModal from "../../../workboard/Modal/CustomModal";
import { handleComposeEmail } from "../../store/slice";
import { SendOutlined } from "@ant-design/icons";

function EmailForm() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
    userLanguage
  ];
  const { detail, labels, placeHolder } = LeadManagerDictionaryList;
  return (
    <div className="flex flex-col ">
      <div className="p-2">
        <Input placeholder={placeHolder.to} />
      </div>
      <div className="p-2">
        <Input placeholder={placeHolder.subject} />
      </div>
      <div className="p-2">
        <ReactQuill />
      </div>
    </div>
  );
}

function ComposeEmail() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
    userLanguage
  ];
  const { detail, labels, placeHolder } = LeadManagerDictionaryList;
  const composeEmail = useSelector(
    (state) => state.leadMangerSlice.composeEmail
  );

  return (
    <CustomModal
      isModalVisible={composeEmail}
      onCancel={() => {
        dispatch(handleComposeEmail(false));
      }}
      title={<div className="flex justify-center"> {labels.composeEmail}</div>}
      footer={
        <div className="flex justify-end gap-2 items-center">
          {/* <Button className="primary_btn !w-fit">{labels.preview}</Button> */}
          <Button className="primary_btn !w-fit">
            {labels.send} <SendOutlined />
          </Button>
        </div>
      }
      centered={true}
      children={<EmailForm />}
      className={"rounded-lg"}
      width={"50%"}
    />
  );
}

export default ComposeEmail;
