import { AdminContainer } from '../../../../components/HrMenu/Administration/StyledComponents/admin';

import {
  FormContainer,
  FormHeader,
} from '../../../../components/HrMenu/Administration/StyledComponents/adminForm';
import SingleUpload from '../../../sharedComponents/Upload/singleUpload';
import { useState } from 'react';
import { Form } from 'antd';

const BusinessLogo = () => {
  const [profileImage, setProfileImage] = useState(null);
  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  return (
    <AdminContainer>
      <FormContainer>
        <FormHeader>Business Logo</FormHeader>
        <div className="flex justify-center">
          <Form.Item area="true">
            <SingleUpload
              handleImageUpload={handleImageUpload}
              img="Add Image"
              position="flex-start"
              uploadText={'Upload'}
            />
          </Form.Item>
        </div>
      </FormContainer>
    </AdminContainer>
  );
};

export default BusinessLogo;
