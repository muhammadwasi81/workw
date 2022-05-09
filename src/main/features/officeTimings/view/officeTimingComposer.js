import "./officeTiming.css"
import { React, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { addOfficeTimingGroup } from "../store/actions";
import OfficeTimingForm from "./form";

function OfficeTimingComposer() {
  const {responsiveSlice} = useSelector(state => state);
  const {isMobileScreen} = responsiveSlice;

  const initialState = { name: "", description: "" };
  const [officeTimingGroups, setOfficeTimingGroups] = useState(initialState);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.officeTimingSlice);

  // const handleDelete = (e) => {
  //   dispatch(removeGrade(e));
  // };

  const onSubmit = (e) => {
    if (!e.id) {
      dispatch(addOfficeTimingGroup(e));
      setOfficeTimingGroups(initialState);
      return;
    }
  }

    return (
      <>
          <OfficeTimingForm data={officeTimingGroups} onSubmit={onSubmit} loading={loader} />
      </>

    )
}



export default OfficeTimingComposer
  