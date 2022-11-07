import face01 from "../../../../content/NewContent/checkIn/angry.svg";
import face02 from "../../../../content/NewContent/checkIn/feeling-not-good.svg";
import face03 from "../../../../content/NewContent/checkIn/Neutral.svg";
import face04 from "../../../../content/NewContent/checkIn/feeling-good.svg";
import face05 from "../../../../content/NewContent/checkIn/happy.svg";

export const TeamsMoodEnum = [
  {
    label: "Very Unsatisfied",
    value: 1,
    Icon: <img src={face01} />,
  },
  {
    label: "Unsatisfied",
    value: 2,
    Icon: <img src={face02} />,
  },
  {
    label: "Neutral",
    value: 3,
    Icon: <img src={face03} />,
  },
  {
    label: "Satisfied",
    value: 4,
    Icon: <img src={face04} />,
  },
  {
    label: "Very Satisfied",
    value: 5,
    Icon: <img src={face05} />,
  },
];
export const TeamStatusEnum = [
  {
    label: "Check Out",
    value: 1,
  },
  {
    label: "Check In",
    value: 2,
  },
];
