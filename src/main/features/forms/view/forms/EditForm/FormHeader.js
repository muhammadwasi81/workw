import React from "react";
// import AcceptingResponse from "../SubmitForm/Switch";

const FormHeader = (props) => {
  const {
    description,
    title,
    handleChangeEmail,
    disableSubmit,
    isAcceptingResp,
    handleChangeTitle,
    handleDescriptionChange,
  } = props;
  return (
    <>
      <div className="c-row bg-clr editForm">
        <div className="f-head-item p_15 flex flex-col">
          <input
            className="e-tlt"
            defaultValue={title}
            onChange={handleChangeTitle}
          />
          <input
            className="e-desc f-bold"
            defaultValue={description}
            onChange={handleDescriptionChange}
          />
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
