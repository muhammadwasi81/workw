import React, { useEffect } from "react";
import SchedulersComponent from "./SchedulerComponent";
import "antd/dist/antd.css";
import "../Schedule/style/schedular.css";
import { useSelector, useDispatch } from "react-redux";
import { GetReferenceById } from "../projects/store/action";
import { useParams } from "react-router-dom";

const Scheduler = (referenceId) => {
  console.log(referenceId, "referenceId");
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.userSlice.user.id);
  // const id = userId;
  const { id } = useParams();

  const { referenceDetail } = useSelector(
    (state) => state.externalBookAppointment
  );
  // const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    dispatch(GetReferenceById(id));
  }, []);
  console.log(id);
  return (
    <div className="wrapper">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden drop-shadow-2xl color-gray-900">
          <img
            src={referenceDetail?.image}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4 mt-10">
          <h2 className="font-bold text-lg">{referenceDetail?.name}</h2>
          <p className="text-gray-500 drop-shadow-2xl	color-black-900">
            {referenceDetail?.designation}
          </p>
        </div>
        <br />
      </div>

      <div className="clenderwraper drop-shadow-2xl	color-black-900">
        <SchedulersComponent id={id} referenceId={referenceId} />
      </div>
    </div>
  );
};

export default Scheduler;
