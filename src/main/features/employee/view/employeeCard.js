import { useContext } from 'react';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { disableEmployee } from '../../../../utils/Shared/store/actions';
import { Popconfirm } from 'antd';
import { EmployeeDisableFilterEnum } from '../util/EmployeeEnum';
import {
  ActionButton,
  ButtonsBox,
  ContentBox,
  Heading,
  ImageBox,
  Parent,
  Text,
} from '../Styles/employeeCard.styles';

function EmployeeCard({
  employees: { image, name, email, designation, id },
  filterType,
}) {
  // console.log(filterType, 'filterType');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];

  const confirm = (e) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    // console.log({ userId: id, status: 'DISABLED' });
    const payload = {
      userId: id,
      isDisable:
        filterType === EmployeeDisableFilterEnum.Disable ? true : false,
    };
    dispatch(disableEmployee(payload));
  };

  const cancel = (e) => {
    console.log(e);
  };

  return (
    <Parent>
      <ImageBox
        src={
          image
            ? image
            : 'https://konnect.im/static/media/user_default.22b0811e.jpg'
        }
        alt="logo"
        loading="lazy"
      />
      <ContentBox>
        <Heading>{name}</Heading>
        <Text>{email}</Text>
        <Text>
          <strong>{designation || 'No Designation'}</strong>
        </Text>
        <ButtonsBox>
          <Popconfirm
            title="Are you sure to disable this employee?"
            description="Are you sure to disable this employee?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <ActionButton
              BackgroundColor={filterType === 0 ? '#01ae3a' : '#db5252'}
            >
              {filterType === 0 ? 'Enable' : sharedLabels.Disable}
            </ActionButton>
          </Popconfirm>
          <ActionButton
            onClick={() => {
              navigate(`info/basicInfo/${id}`);
            }}
            BackgroundColor="var(--currentThemeColor) !important"
          >
            {sharedLabels.Update}
          </ActionButton>
        </ButtonsBox>
      </ContentBox>
    </Parent>
  );
}

export default EmployeeCard;
