import React, { useEffect } from "react";
import SchedulersComponent from "./SchedulerComponent";
import { Avatar } from "antd";
import "antd/dist/antd.css";
import "../Schedule/style/schedular.css";
import { useSelector, useDispatch } from "react-redux";
import { GetReferenceById } from "../projects/store/action";

const Scheduler = (referenceId) => {
  console.log(referenceId, "referenceId");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlice.user.id);
  const id = userId;
  console.log(userId, "dattttaaaa");

  const { referenceDetail } = useSelector(
    (state) => state.externalBookAppointment
  );
  useEffect(() => {
    dispatch(GetReferenceById(id));
  }, []);

  console.log(referenceDetail, "state");
  return (
    <div className="wrapper">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={referenceDetail?.image}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4 mt-10">
          <h2 className="font-bold text-lg">{referenceDetail?.name}</h2>
          <p className="text-gray-500">{referenceDetail?.designation}</p>
        </div>
        <br />
      </div>

      <div className="clenderwraper">
        <SchedulersComponent referenceId={referenceId} />
      </div>
    </div>
  );
};

export default Scheduler;
