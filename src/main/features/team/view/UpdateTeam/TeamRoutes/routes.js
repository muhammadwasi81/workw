import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrokenPage } from "../../../../../../utils/base";
import Attendence from "../../Attendence";
import CheckIn from "../../CheckIn";
import Leaves from "../../Leaves";
import Rewards from "../../Rewards";
import Appraisals from "../../Appraisals";
import Warnings from "../../Warnings";
import Complains from "../../Complains";
import Courses from "../../Courses";
import Education from "../../Education";
import Experience from "../../Experience";
import Loan from "../../Loan";
import ActivityLog from "../../ActivityLog";
import "../../../Styles/team.css";

const TeamRoutes = () => {
  return (
    <>
      <div className="updateFormsBody w-full">
        <Routes>
          <Route path={"attendence/:id"} element={<Attendence />} />
          <Route path={"checkIn/:id"} element={<CheckIn />} />
          <Route path={"leaves/:id"} element={<Leaves />} />
          <Route path={"rewards/:id"} element={<Rewards />} />
          <Route path={"appraisals/:id"} element={<Appraisals />} />
          <Route path={"warning/:id"} element={<Warnings />} />
          <Route path={"complain/:id"} element={<Complains />} />
          <Route path={"courses/:id"} element={<Courses />} />
          <Route path={"education/:id"} element={<Education />} />
          <Route path={"experience/:id"} element={<Experience />} />
          <Route path={"loan/:id"} element={<Loan />} />
          <Route path={"activityLog/:id"} element={<ActivityLog />} />
        </Routes>
      </div>
    </>
  );
};
export default TeamRoutes;
