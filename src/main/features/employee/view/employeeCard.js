import React, { useContext } from "react";
import { CommentOutlined } from "@ant-design/icons";
import CustomButton from "../../../sharedComponents/button";
import { EmployeeCardCustom } from "../Styles/employee.style";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { employeeDictionaryList } from "../localization/index";
import { Link, useNavigate } from "react-router-dom";

function EmployeeCard({ image, name, email, designation, empNum, id }) {
  const navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { employeesDictionary } = employeeDictionaryList[userLanguage];
  const value = employeesDictionary.EmployeeList;
  return (
    <EmployeeCardCustom>
      <div className="w-full" style={{ width: "max-content" }}>
        <div className="employeeCard__img">
          <img src={image || "https://joeschmoe.io/api/v1/random"} alt="" />
        </div>
      </div>
      <div className="employeeCard__body w-full">
        <p>{name}</p>
        {/* <div>
          <span>{value.number}:</span>
          {empNum}
        </div> */}
        <div>
          <span>{value.email}:</span> {email}
        </div>
        <div>
          <span>{value.designation}:</span>
          {designation}
        </div>
        <div className="buttonGroup">
          <CustomButton title={sharedLabels.Disable} buttonClass=" tag_expense_btn font_bold dangerBtn " />
          <CustomButton title={sharedLabels.Update}  onClick={() => { navigate(`info/${id}/basicInfo` ) }} buttonClass="ThemeBtn tag_expense_btn font_bold " />
        </div>
      </div>
      <div className="employeeCard__footer">
        <CommentOutlined />
      </div>
    </EmployeeCardCustom>
  );
}

export default EmployeeCard;
