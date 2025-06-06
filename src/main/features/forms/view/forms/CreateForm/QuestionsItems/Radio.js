import React from "react";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
import { CloseSquareOutlined } from "@ant-design/icons";

const Radio = (props) => {
  const {
    question,
    handleRadioChange,
    index,
    disableSubmit,
    removeQuestion,
  } = props;
  const { answers } = question;

  console.log("radio", props);

  return (
    <>
      <div className="c-row txt-fields bg-clr p_15 d-flex">
        {/* img here */}
        <div className="flex-1">
          {question.image.file && (
            <div className="QuesImg ">
              <img
                src={(window.URL || window.webkitURL).createObjectURL(
                  question?.image.file
                )}
              />{" "}
            </div>
          )}
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <h1 className="row-tlt">{question.question}</h1>
            <div onClick={() => removeQuestion(index)}>
              <CloseSquareOutlined style={{ fontSize: "150%" }} />
            </div>
          </div>

          {answers.map(({ answer, id }, i) => (
            <div key={i} className="radio-wrapper mb_10">
              <label htmlFor="">
                <input
                  onChange={(e) =>
                    handleRadioChange(
                      e.target.value,
                      index,
                      question.id,
                      question.localType
                    )
                  }
                  className="styled-radio mr_10"
                  type="radio"
                  name="radio"
                  id="radio1"
                  value={id}
                  disabled={disableSubmit}
                />
                <h3 className="f-bold">{answer}</h3>
              </label>
            </div>
          ))}
          <div className="flex-end">
            {/* <button className="clr-sec">Clear Section</button> */}
          </div>
        </div>
        <div className="dragIcon">{/* <DragHandleIcon /> */}</div>
      </div>
    </>
  );
};

export default Radio;
