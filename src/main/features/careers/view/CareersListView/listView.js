import React from "react";
import ListItem from "./ListItem";

function ListView() {
  return (
    <div className="p-[5px]" >
      {/* <div className="policyHeader colorTheme">
        Jobs
      </div> */}
      <div className="listView pt-3" >
        {
          [1].length !== 0 && [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((item) =>
            <ListItem item={item} />)
        }
      </div>
    </div>
  );
}

export default ListView;
