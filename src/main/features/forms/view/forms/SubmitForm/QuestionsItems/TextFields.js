import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../../../localization/index";

const TextFields = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];

  const { yourAnswer } = documentDictionary;
  const {
    type,
    fieldData,
    handleChange,
    index,
    disableSubmit,
    required,
  } = props;
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
          placeholder={yourAnswer}
          disabled={disableSubmit}
        />
      </div>
    </>
  );
};

export default TextFields;
