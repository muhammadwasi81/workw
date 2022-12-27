import React, { useContext } from "react";
// import AcceptingResponse from "./Switch";
// import { getUserDataFromStorage, STRINGS } from "../../../utils/base";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../../localization/index";

const FormHeader = (props) => {
  const {
    description,
    title,
    handleChangeEmail,
    disableSubmit,
    isAcceptingResp,
  } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];

  const { email, yourEmail } = documentDictionary;
  return (
    <>
      <div className="c-row bg-clr">
        <div className="f-head-item p_15">
          <h1 className="tlt">{title}</h1>
          <p className="desc f-bold">{description}</p>
        </div>
      </div>
      {!disableSubmit && (
        <div className="c-row txt-fields bg-clr p_15">
          <label className="required label" htmlFor="">
            {email}
          </label>
          <input
            className="styled-input"
            type="text"
            placeholder={yourEmail}
            onChange={handleChangeEmail}
            disabled={true}
          />
          {/* <input className="styled-input" type="text" placeholder="Your Email"
          disabled={(!!localStorage.getItem(STRINGS.STORAGE.token))}
          defaultValue={!!localStorage.getItem(STRINGS.STORAGE.token) ? getUserDataFromStorage(STRINGS.STORAGE.email) : ""}
          onChange={handleChangeEmail} /> */}
        </div>
      )}
    </>
  );
};

export default FormHeader;
