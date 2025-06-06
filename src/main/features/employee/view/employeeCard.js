import { useContext, memo } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { disableEmployee } from "../../../../utils/Shared/store/actions";
import { Popconfirm } from "antd";
import {
  ActionButton,
  ButtonsBox,
  ContentBox,
  Heading,
  ImageBox,
  Parent,
  Text,
} from "../Styles/employeeCard.styles";
import PropTypes from "prop-types";
import userAvatar from "../../../../content/png/userAvatar.jpg";
import { userTypeEnum } from "../../../../utils/Shared/enums/enums";
import { removeDisabledEmployee } from "../../../../utils/Shared/store/slice";
function EmployeeCard({
  employees: { image, name, email, designation, id, isDisable, userTypeId },
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];

  const confirm = (e) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    const payload = {
      userId: id,
      isDisable: isDisable === true ? false : true,
    };
    dispatch(disableEmployee(payload));
    dispatch(removeDisabledEmployee(id));
  };

  const cancel = (e) => {
    console.log(e);
  };

  return (
    <Parent>
      <ImageBox src={image ? image : userAvatar} alt="logo" loading="lazy" />
      <ContentBox>
        <Heading>{name}</Heading>
        <Text>{email}</Text>
        <Text>
          <strong>{designation || "No Designation"}</strong>
        </Text>
        <ButtonsBox>
          {userTypeId !== userTypeEnum.SuperAdmin ? (
            <Popconfirm
              title={
                isDisable === true
                  ? "Are you sure to enable this employee"
                  : "Are you sure to disable this employee"
              }
              description="Are you sure to disable this employee?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <ActionButton BackgroundColor={isDisable ? "#01ae3a" : "#db5252"}>
                {isDisable ? "Enable" : sharedLabels.Disable}
              </ActionButton>
            </Popconfirm>
          ) : null}
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

export default memo(EmployeeCard);
