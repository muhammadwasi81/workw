import React, { useState } from 'react';
import face01 from "../../../../../content/NewContent/checkIn/angry.svg";
import face02 from "../../../../../content/NewContent/checkIn/feeling-not-good.svg";
import face03 from "../../../../../content/NewContent/checkIn/Neutral.svg";
import face04 from "../../../../../content/NewContent/checkIn/feeling-good.svg";
import face05 from "../../../../../content/NewContent/checkIn/happy.svg";
import { Rate } from 'antd';


export default function FaceRating({ handleChange }) {
  const [RateValue, setRateValue ] = useState(3);
  const onChange = (value) => {
    setRateValue(value);
    handleChange(value)
  }

  const customIcons = {
    1: {
      icon: <img src={face01} className="reactionIcon" style={{ border:RateValue === 1 ? "2px solid black" : "unset" }} />,
      label: 'Very Dissatisfied'
    },
    2: {
      icon: <img src={face02} className="reactionIcon" style={{ border:RateValue === 2 ? "2px solid black" : "unset" }} />,
      label: 'Dissatisfied'
    },
    3: {
      icon: <img src={face03} className="reactionIcon" style={{ border:RateValue === 3 ? "2px solid black" : "unset" }} />,
      label: 'Neutral'
    },
    4: {
      icon: <img src={face04} className="reactionIcon" style={{ border:RateValue === 4 ? "2px solid black" : "unset" }} />,
      label: 'Satisfied'
    },
    5: {
      icon: <img src={face05} className="reactionIcon" style={{ border:RateValue === 5 ? "2px solid black" : "unset" }} />,
      label: 'Very Satisfied'
    },
  };
  return (
    <div className='flex justify-center mt-5'>
      <Rate defaultValue={RateValue} character={({ index }) => customIcons[index + 1].icon} onChange={onChange} />
    </div>
  );
}

