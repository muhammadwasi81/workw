import React from "react";
// import DragHandleIcon from '@material-ui/icons/DragHandle';

const RadioWithImage = (props) => {
  const { question, handleChange, index, disableSubmit } = props;
  const { answers } = question;
  console.log("props radio with immage", props);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  };

  return (
    <>
      <div className="c-row txt-fields bg-clr p_15 d-flex">
        <div className="flex-1">
          {question.image && (
            <div className="QuesImg">
              <img src={question.image} />{" "}
            </div>
          )}
          <h1 className="row-tlt">{question.question}</h1>
          <div className="flex-row">
            {answers.map(({ answer, id, image }, i) => (
              <div className="aspect-ratio">
                <label key={i} className="label-box">
                  <img
                    src={
                      image
                        ? (window.URL || window.webkitURL).createObjectURL(
                            image.file
                          )
                        : "https://asvs.in/wp-content/uploads/2017/08/dummy.png"
                    }
                    // src={{typeof image === 'string' ? image : getBase64(image, (result)=>  result)}}
                    alt=""
                  />
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
        <div className="dragIcon">{/* <DragHandleIcon /> */}</div>
      </div>
    </>
  );
};

export default RadioWithImage;
