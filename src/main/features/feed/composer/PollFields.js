import React, { useState } from "react";
import { Input, Select, Form } from "antd";
import PollInput from "../../../sharedComponents/PollInput/PollInput";

const PollFields = (props) => {
  const { setFieldsType } = props;
  const [pollOptions, setPollOptions] = useState([
    { placeholder: "Option 1" },
    { placeholder: "Option 2" },
  ]);

  const { TextArea } = Input;

  // add poll option to array
  const addPollOption = (index) => {
    setPollOptions([
      ...pollOptions,
      { placeholder: `Option ${pollOptions.length + 1}` },
    ]);
  };

  // remove poll option from array
  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      const newPollOptions = [...pollOptions];
      newPollOptions.splice(index, 1);
      setPollOptions(newPollOptions);
    }
  };

  return (
    <>
      <Form.Item name={"askSomething"}>
        <TextArea
          bordered={false}
          placeholder="Ask something..."
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
      </Form.Item>
      {pollOptions.map((v, i) => (
        <PollInput
          onChange={(e) => console.log(e.target.value)}
          removePollOption={() => removePollOption(i)}
          placeholder={v.placeholder}
          key={i}
          index={i}
        />
      ))}
      <div className="poll-options">
        <button onClick={() => setFieldsType("postDetails")}>
          Remove poll
        </button>
        {pollOptions.length < 4 && (
          <button onClick={addPollOption}>Add poll option</button>
        )}
      </div>
    </>
  );
};

export default PollFields;
