import "./officeTiming.css";
import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOfficeTimingGroup } from "../store/actions";
import OfficeTimingForm from "./form";
import { message } from "antd";
import { updateOfficeTimingGroupAction } from "../store/actions";

function OfficeTimingComposer({ editData, isEdited }) {
  const { responsiveSlice } = useSelector((state) => state);
  const { isMobileScreen } = responsiveSlice;

  const initialState = { name: "", description: "" };
  const [officeTimingGroups, setOfficeTimingGroups] = useState(initialState);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.officeTimingSlice);

  const onSubmit = (e) => {
    console.log(e, "eeeeee");
    if (editData) {
      dispatch(updateOfficeTimingGroupAction(e));
    } else {
      if (e.name === "" || e.description === "") {
        message.error("Please fill all required fields");
      } else {
        if (!e.id) {
          let filteredData = {
            ...e,
            details: e.details
              .filter((y) => y.isWorking)
              .map((item) => ({
                ...item,
                //checkIn: e._d.getMinutes() * 60 + e._d.getHours() * 3600,
                // checkOut: e._d.getMinutes() * 60 + e._d.getHours() * 3600,

                // checkIn: new Date(item.checkIn).getTime().getMinutes(),
                // checkOut: new Date(item.checkOut).getTime().getMinutes(),

                //checkIn: 0,
                // checkOut: 0,
              })),
          };

          dispatch(addOfficeTimingGroup(filteredData));

          setOfficeTimingGroups(initialState);
          return;
        }
      }
    }
  };

  return (
    <>
      <OfficeTimingForm
        data={officeTimingGroups}
        onSubmit={onSubmit}
        loading={loader}
        isEdited={isEdited}
        editData={editData}
      />
    </>
  );
}

export default OfficeTimingComposer;
