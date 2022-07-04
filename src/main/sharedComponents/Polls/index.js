import React, { useState } from "react";
import "./style.css";
import { Radio } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import thor from "../../../content/thor.jpg";

function Polls({ options, voteCounts, attachments }) {
  const [isVoted, setIsVoted] = useState("");
  const getValue = (opt) => {
    setIsVoted(opt);
  };
  const handleUndo = () => {
    options.setIsVoted("");
  };

  return (
    <div className="polls">
      <Radio.Group optionType="button" defaultValue={isVoted}>
        {options.map(({ option, votes, youVoted, attachmentId }, index) => {
          if (youVoted && isVoted !== option) {
            getValue(option);
          }
          const width = (votes / voteCounts) * 100;
          const attachment = attachments.filter(
            (item) => item.id === attachmentId
          );

          return (
            <>
              <Radio.Button value={option} key={index}>
                <div className="pollValue" style={{ width: `${width}%` }}>
                  <div className="left">
                    <span className="icon">
                      <CheckCircleOutlined />
                    </span>
                    <span className="label">{option}</span>
                  </div>
                  <div className="right">
                    {isVoted === option ? (
                      <span className="voteCount" onClick={handleUndo}>
                        Undo
                      </span>
                    ) : (
                      <span className="voteCount">{`${votes} Votes`}</span>
                    )}
                  </div>
                </div>
              </Radio.Button>
            </>
          );
        })}
      </Radio.Group>
    </div>
  );
}

export default Polls;
