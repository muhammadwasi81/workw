import React from "react";

const Radio = (props) => {
  const { question, handleRadioChange, index, disableSubmit } = props;
  const { answers } = question;
  console.log("radio", props);

  return (
    <>
      <div className="c-row txt-fields bg-clr p_15">
        {/* img here */}
        {question.image && (
          <div className="QuesImg">
            <img src={question.image} />{" "}
          </div>
        )}
        <h1 className="row-tlt">{question.question}</h1>
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
              <div className="f-bold">{answer}</div>
            </label>
          </div>
        ))}
        <div className="flex-end">
          {/* <button className="clr-sec">Clear Section</button> */}
        </div>
      </div>
    </>
  );
};

export default Radio;
