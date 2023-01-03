import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";

import {
  FormContainer,
  FormHeader,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { useState, useContext } from "react";
import { Form } from "antd";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
// import "../style/style.css";

const BusinessLogo = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  const [profileImage, setProfileImage] = useState(null);
  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  return (
    <AdminContainer>
      <FormContainer>
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
      </FormContainer>
    </AdminContainer>
  );
};

export default BusinessLogo;
