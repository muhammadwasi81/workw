import React from "react";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";

import {
  FormContainer,
  FormHeader,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { useState, useContext } from "react";
import { Button, Divider, Form } from "antd";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import blackLogo from "../../../../content/blackLogo.svg";
import { ContBody } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import "./adminstartionCard.css";
const BusinessLogo = ({ formData, setFormData, handleChangeTab }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  const [profileImage, setProfileImage] = useState(null);
  const handleImageUpload = (data) => {
    setProfileImage(data);
  };
  const onSubmitBusinessLogo = () => {
    handleChangeTab();
  };
  return (
    <>
      <div>
        <img src={blackLogo} width={70} />
      </div>
      <div className="flex flex-row gap-5">
        <div className=" flex flex-col">
          <FormContainer
            className="adminstration-card"
            style={{ width: "500px", marginTop: "30px", height: "390px" }}
          >
            <FormHeader>{sharedLabels.businessLogo}</FormHeader>
            <div className="flex justify-center">
              <Form.Item area="true">
                <div className="logoHeader">Short Logo</div>
                <SingleUpload
                  handleImageUpload={handleImageUpload}
                  img="Add Image"
                  position="flex-start"
                  uploadText={"Upload"}
                />
              </Form.Item>
            </div>

            <div className="flex justify-center">
              <Form.Item area="true">
                <div className="logoHeader">Full Logo</div>
                <SingleUpload
                  handleImageUpload={handleImageUpload}
                  img="Add Image"
                  position="flex-start"
                  uploadText={"Upload"}
                />
              </Form.Item>
            </div>
            <div className="flex justify-center">
              <Form.Item area="true">
                <Button
                  type="primary"
                  size="medium"
                  className="ThemeBtn"
                  onClick={() => onSubmitBusinessLogo(formData)}
                  //loading={loader}
                >
                  Add Logo
                </Button>
              </Form.Item>
            </div>
          </FormContainer>
        </div>
        <Divider
          type="vertical"
          style={{ height: "400px", marginTop: 0, marginBottom: 0 }}
          className="divider"
        />
        <div className="basis-1/4  flex flex-col justify-center">
          <div className="moduleHeader justify-center mb-7">Business Logo</div>
          <img src={blackLogo} width={200} />
        </div>
      </div>
    </>
  );
};

export default BusinessLogo;
