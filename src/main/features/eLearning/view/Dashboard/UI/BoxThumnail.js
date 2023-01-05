import React from "react";

function BoxThumnail({ image, tag, title, description, level }) {
  return (
    <>
      <div className="relative ">
        <div className="overflow-hidden h-[200px] rounded-xl">
          <img width={"100%"} src={image} alt={title} className=" object-cover" />
        </div>
        {tag && (
          <div className="bg-white rounded-lg absolute bottom-4 left-2 p-1 px-2 font-semibold flex items-center gap-1">
            {tag} {level && level}
          </div>
        )}
      </div>
      <h1 className="!m-0 font-semibold text-2xl">{title}</h1>
      <p className="!m-0 text-[#757D86]">
        {description && description.substring(0, 120) + "..."}
      </p>
    </>
  );
}

export default BoxThumnail;
