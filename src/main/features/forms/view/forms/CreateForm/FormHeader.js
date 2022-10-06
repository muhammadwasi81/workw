import React from "react";
// import AcceptingResponse from "../SubmitForm/Switch";

const FormHeader = (props) => {
  const {
    description,
    title,
    handleChangeEmail,
    disableSubmit,
    isAcceptingResp,
  } = props;
  return (
    <>
      <div className="c-row bg-clr editForm">
        <div className="f-head-item p_15">
          <input className="e-tlt" defaultValue={title} />
          <input className="e-desc f-bold" defaultValue={description} />
        </div>
        <div className="p_15 f-head-main">
          <div className="flex-between wrap">
            {/* <AcceptingResponse isAcceptingResponse={isAcceptingResp} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormHeader;
