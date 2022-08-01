import { Calendar } from "antd";
import React, { useState } from "react";
import moment from "moment";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
function Header({ currentDate, onCalender, onToday, onPrev, onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = isOpen ? "schedulerCalender Open" : "schedulerCalender";
  const isCurrentDate = moment(moment.now(), "dddd HH:mm:ss").isSame(
    moment(currentDate, "dddd HH:mm:ss"),
    "day"
  );
  const todayClasess = isCurrentDate ? "today current" : "today";

  return (
    <div className="scheduler__header">
      <p>Calender</p>
      <span
        className="currentDate"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {moment(currentDate).format("MMMM DD YYYY")}
        {isOpen ? (
          <CaretUpOutlined
            style={{
              color: "var(--currentThemeColor)",
              fontSize: "16px",
            }}
          />
        ) : (
          <CaretDownOutlined
            style={{
              color: "var(--currentThemeColor)",
              fontSize: "16px",
            }}
          />
        )}
      </span>
      <div className="header__inner">
        <span className={todayClasess} onClick={onToday}>
          Today
        </span>
        <div className="buttons">
          <button onClick={onPrev}>
            <LeftOutlined />
          </button>
          <button onClick={onNext}>
            <RightOutlined />
          </button>
        </div>
      </div>
      <Calendar
        defaultValue={currentDate}
        className={classes}
        fullscreen={false}
        onChange={onCalender}
      />
    </div>
  );
}

export default Header;
