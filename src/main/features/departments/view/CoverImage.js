import React from "react";
import departmentDefaultImage from "../../../../content/NewContent/department/department.svg";

function CoverImage(props) {
  console.log(props);
  return (
    <div className="h-[400px]">
      <img
        className="h-full object-cover w-full rounded-xl z-0"
        src={props?.images ? props.image : departmentDefaultImage}
        alt="cover photo"
      />
    </div>
  );
}

export default CoverImage;
