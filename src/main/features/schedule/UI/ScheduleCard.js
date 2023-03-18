import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getAllSchedule } from "../store/action";
import ScheduleCardDetail from "./ScheduleCardDetail";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import Scroll from "../../../sharedComponents/ScrollSelect/infinteScoll";
import { Skeleton } from "antd";

function ScheduleCard({ sheduleType = "", setScheduleData = () => {} }) {
  const schedules = useSelector((state) => state.scheduleSlice.schedules);
  const loading = useSelector((state) => state.scheduleSlice.loading);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();

  const fetchAllSchedule = (startDate, endDate) => {
    if (startDate.length && endDate.length) {
      dispatch(
        getAllSchedule({
          pageNo: 1,
          pageSize: 20,
          search: "",
          sortBy: 1,
          referenceId: defaultUiid,
          referenceType: 0,
          startDate,
          endDate,
        })
      );
    }
    if (!startDate.length && endDate.length) {
      dispatch(
        getAllSchedule({
          pageNo: 1,
          pageSize: 20,
          search: "",
          sortBy: 1,
          referenceId: defaultUiid,
          referenceType: 0,
          //   startDate,
          endDate,
        })
      );
    }
    if (startDate.length && !endDate.length) {
      dispatch(
        getAllSchedule({
          pageNo: 1,
          pageSize: 20,
          search: "",
          sortBy: 1,
          referenceId: defaultUiid,
          referenceType: 0,
          startDate,
          //   endDate,
        })
      );
    }
  };

  useEffect(() => {
    // fetchAllSchedule(
    //   "",
    //   moment()
    //     .subtract(1, "days")
    //     .format()
    // );
  }, []);
  // console.log("sheduleType", sheduleType);
  // useEffect(() => {
  //   if (sheduleType === "Today") {
  //     fetchAllSchedule(
  //       moment()
  //         .startOf("D")
  //         .format(),
  //       moment()
  //         .endOf("D")
  //         .format()
  //     );
  //   }
  //   if (sheduleType === "Past") {
  //     fetchAllSchedule(
  //       "",
  //       moment()
  //         .subtract(1, "days")
  //         .format()
  //     );
  //   }
  //   if (sheduleType === "Upcoming") {
  //     fetchAllSchedule(
  //       moment()
  //         .add(1, "days")
  //         .format(),
  //       ""
  //     );
  //   }
  // }, [pageNo]);

  const handleScheduleTypeData = (value) => {
    // console.log("value: ", value);
    setScheduleData({
      type: value.scheduleType,
      id: value.id,
    });
  };
  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {schedules.length > 0 ? (
            <div
              style={{
                height: "70vh",
              }}
            >
              <Scroll
                isLoading={loading}
                data={schedules}
                fetchMoreData={(pageNo) => {
                  setPageNo(pageNo);
                }}
                loader={<>Loading schedules...</>}
                endMessage={"No data..."}
              >
                {schedules?.map((schedule) => (
                  <div
                    className="rounded-lg p-3 bg-white  flex flex-col gap-3 mb-2 hover:border-primary-color hover:border transition-all border"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleScheduleTypeData(schedule);
                    }}
                  >
                    <div className="flex flex-col">
                      {/* <p className="text-[#757d86]">SAT,Jul 14,2022</p> */}
                      <ScheduleCardDetail schedule={schedule} />
                    </div>
                  </div>
                ))}
              </Scroll>
            </div>
          ) : (
            <div>No Data</div>
          )}
        </>
      )}
    </>
  );
}

export default ScheduleCard;
