import React from "react";

const TextFields = (props) => {
  const { type, fieldData, handleChange, index, disableSubmit } = props;
  return (
    <>
      <div className="c-row txt-fields bg-clr p_15">
        {fieldData.image && (
          <div className="QuesImg">
            <img src={fieldData.image} />{" "}
          </div>
        )}
        <label className="required label" htmlFor="">
          {fieldData.question}
        </label>
        <input
          onChange={(e) =>
            handleChange(
              e.target.value,
              index,
              fieldData.id,
              fieldData.localType
            )
          }
          className="styled-input"
          type={type}
          placeholder="Your answer"
          disabled={disableSubmit}
        />
      </div>
    </>
  );
};

export default TextFields;
