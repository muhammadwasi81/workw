import React from "react";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
import { CloseSquareOutlined } from "@ant-design/icons";
import "./style.css";

const RadioWithImage = ({ question }) => {
  const { answers } = question;
  console.log("props radio with immage", question);

  // return <div>ssss</div>;

  return (
    <>
      <div className="card mb-4">
        <div className="flex-1">
          {question.attachments.file && (
            <div className="QuesImg">
              <img src={URL.createObjectURL(question.attachments.file)} />{" "}
            </div>
          )}
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <h1 className="row-tlt">{question.question}</h1>
          </div>

          <div className="grid grid-cols-2 gap-x-8">
            {answers.map(({ answer, id, isTrue, attachments }, i) => (
              <div className="aspect-ratio">
                <label key={i} className="label-box">
                  <img
                    src={
                      attachments.file
                        ? URL.createObjectURL(attachments.file)
                        : "https://asvs.in/wp-content/uploads/2017/08/dummy.png"
                    }
                    alt=""
                    style={{ width: "300px", height: "206.76px" }}
                  />
                  <div className="flex mt-[1rem] gap-x-4">
                    <input
                      className="styled-radio mr_10"
                      type="radio"
                      name="radio"
                      id="radio1"
                      checked={isTrue === true ? true : false}
                      //   value={id}
                      disabled={true}
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
        <div className="dragIcon">{/* <DragHandleIcon /> */}</div>
      </div>
    </>
  );
};

export default RadioWithImage;
