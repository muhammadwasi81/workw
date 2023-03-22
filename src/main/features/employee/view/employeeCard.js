import { useContext, useState } from 'react';
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
import PropTypes from 'prop-types';

function EmployeeCard({
  employees: { image, name, email, designation, id, isDisable },
  filterType,
}) {
  // console.log(filterType, 'filterType');
  const [disabled, setDisabled] = useState(isDisable);
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
      // isDisable: !disabled,
    };
    dispatch(disableEmployee(payload));
    setDisabled(!disabled);
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
            title={
              filterType === EmployeeDisableFilterEnum.Disable
                ? 'Are you sure to enable this employee'
                : 'Are you sure to disable this employee'
            }
            description="Are you sure to disable this employee?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <ActionButton
              BackgroundColor={
                filterType === 0
                  ? '#01ae3a'
                  : disabled && filterType === 2
                  ? '#4BB543'
                  : '#db5252'
              }
              // BackgroundColor={filterType === 0 ? '#01ae3a' : '#db5252'}
            >
              {/* {filterType === 0 ? 'Enable' : sharedLabels.Disable} */}
              {filterType === 0
                ? 'Enable'
                : disabled && filterType === 2
                ? 'Enable'
                : sharedLabels.Disable}
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

EmployeeCard.propTypes = {
  employees: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    designation: PropTypes.string,
    id: PropTypes.string,
    isDisable: PropTypes.bool,
  }),
  filterType: PropTypes.number,
};

export default EmployeeCard;
