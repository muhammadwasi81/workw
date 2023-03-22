import { useParams } from 'react-router-dom';
import BasicInfo from '../employee/view/basicForm';

function Index({ handleImageUpload, profileImage }) {
  const { id } = useParams();
  return (
    <BasicInfo
      handleImageUpload={handleImageUpload}
      profileImage={profileImage}
      mode={'edit'}
      id={id}
    />
  );
}

export default Index;
