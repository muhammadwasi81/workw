import React from "react";
import "./style.css";
// import DragHandleIcon from '@material-ui/icons/DragHandle';

const Radio = ({ question }) => {
  const { answers } = question;

  return (
    <>
      <div className="card mb-4">
        {/* img here */}
        <div className="flex-1">
          {question.attachments.file && (
            <div className="QuesImg ">
              <img src={URL.createObjectURL(question.attachments.file)} />{" "}
            </div>
          )}
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <h1 className="text-lg">{question.question}</h1>
          </div>

          {answers.map(({ answer, id, isTrue }, i) => (
            <div key={i} className="flex">
              <label htmlFor="" className="flex gap-4">
                <input
                  //   onChange={(e) =>
                  //     handleRadioChange(
                  //       e.target.value,
                  //       index,
                  //       question.id,
                  //       question.localType
                  //     )
                  //   }
                  className="styled-radio mr_10"
                  type="radio"
                  name="radio"
                  id="radio1"
                  checked={isTrue === true ? true : false}
                  //   value={id}
                  disabled={true}
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
