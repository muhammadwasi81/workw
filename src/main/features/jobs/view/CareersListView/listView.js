import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import ListItem from "./ListItem";

function ListView() {
  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });
  const { loader } = useSelector((state) => state.careerSlice);
  console.log(careers);
  return (
    <div className="p-[5px]">
      {/* <div className="policyHeader colorTheme">
        Jobs
      </div> */}
      <div className="listView pt-3">
        {loader ? (
          [...Array(15)].map((item) => (
            <Skeleton
              className="p-4"
              key={item}
              avatar
              paragraph={{ rows: 3 }}
            />
          ))
        ) : (
          <>
            {careers.length >= 1 ? (
              careers?.map((data) => <ListItem item={data} />)
            ) : (
              <div className="p-20">
                <NoDataFound />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ListView;
