import React from "react";
// import AcceptingResponse from "./Switch";
// import { getUserDataFromStorage, STRINGS } from "../../../utils/base";

const FormHeader = (props) => {
  const { description, title, handleChangeEmail, disableSubmit, isAcceptingResp } = props;
  
  return (
    <>
      <div className="c-row bg-clr">
        <div className="f-head-item p_15">
          <h1 className="tlt">{title}</h1>
          <p className="desc f-bold">{description}</p>
        </div>
        <div className="p_15 f-head-main">
          <div className="flex-between wrap">
           {/* {disableSubmit && <AcceptingResponse isAcceptingResponse={isAcceptingResp} />} */}
          </div>
        </div>
      </div>
      {!disableSubmit && <div className="c-row txt-fields bg-clr p_15">
        <label className="required label" htmlFor="">
          Email
        </label>
        {/* <input className="styled-input" type="text" placeholder="Your Email"
          disabled={(!!localStorage.getItem(STRINGS.STORAGE.token))}
          defaultValue={!!localStorage.getItem(STRINGS.STORAGE.token) ? getUserDataFromStorage(STRINGS.STORAGE.email) : ""}
          onChange={handleChangeEmail} /> */}
      </div>}
    </>
  );
};

export default FormHeader;
