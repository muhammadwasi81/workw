import React from "react";
import "./ShortProfile.css";

const SearchOptions = (props) => {
  const { name, jobTitle, userIcon } = props;

  return (
    <>
      <div className="user-tag">
        <img src={userIcon} alt="icon" />
        <div>
          <p>{name}</p>
          <p>{jobTitle}</p>
        </div>
      </div>
    </>
  );
};

export default SearchOptions;
