import React from "react";

const RadioWithImage = (props) => {
  const { question, handleChange, index, disableSubmit, required } = props;
  const { answers } = question;
  console.log("console. radiowithimage props", props);
  return (
    <>
      <div className="c-row txt-fields bg-clr p_15">
        {question.image && (
          <div className="QuesImg">
            <img src={question.image} />{" "}
          </div>
        )}
        <h1 className="row-tlt">
          {question.question}
          <span className="text-sm"> {"(radio)"}</span>
        </h1>
        <div className="flex-row">
          {answers.map(({ answer, id, image }, i) => (
            <div className="aspect-ratio">
              <label key={i} className="label-box">
                <div className="pollImage">
                  <img
                    src={
                      image
                        ? image
                        : "https://asvs.in/wp-content/uploads/2017/08/dummy.png"
                    }
                    alt=""
                  />
                </div>
                <div className="flex-item mt_10">
                  <input
                    value={id}
                    onChange={(e) =>
                      handleChange(
                        e.target.value,
                        index,
                        question.id,
                        question.localType
                      )
                    }
                    name="label"
                    type="radio"
                    disabled={disableSubmit}
                  />{" "}
                  <h3 className="ml_10 f-bold">{answer}</h3>
                </div>
              </label>
            </div>
          ))}
        </div>
        {/* <div className="imp-w-radio mt_10">
          <label htmlFor="">
            <input className="styled-radio" name="label" type="radio" />{" "}
            <h3 className="ml_10 f-bold">Other</h3>
          </label>
          <input className="styled-input mt_0" type="text" />
        </div> */}
        <div className="flex-end">
          {/* <button className="clr-sec">Clear Section</button> */}
        </div>
      </div>
    </>
  );
};

export default RadioWithImage;
