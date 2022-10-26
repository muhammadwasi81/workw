import React from "react";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";

function ListView() {
  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });
  console.log(careers);
  return (
    <div className="p-[5px]">
      {/* <div className="policyHeader colorTheme">
        Jobs
      </div> */}
      <div className="listView pt-3">
        {careers?.map((data) => (
          <ListItem item={data} />
        ))}
      </div>
    </div>
  );
}

export default ListView;
