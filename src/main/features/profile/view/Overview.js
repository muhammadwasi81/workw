import OverviewDetail from "../UI/OverviewDetail";
import {
  FaGraduationCap,
  FaPhoneAlt,
  FaHandshake,
  FaBirthdayCake,
} from "react-icons/fa";
import React, { useContext } from "react";
import { BsBriefcaseFill, BsHeartFill } from "react-icons/bs";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";
import moment from "moment";
import { Skeleton } from "antd";
import MartialStatus from "./martialStatus";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { profileDictionaryList } from "../localization/index";

const Overview = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { profileDictionary } = profileDictionaryList[userLanguage];
  const { employees, loader } = useSelector(
    (state) => state.employeeProfileSlice
  );
  console.log(employees, "overview inside");

  return (
    <div className="flex flex-col p-3 gap-5 !text-[#85878B] pb-10">
      {loader ? (
        <Skeleton />
      ) : (
        <>
          <OverviewDetail
            icon={<FaGraduationCap />}
            heading={profileDictionary.studiesALevel}
            text={employees?.education ? employees?.education : "No Education"}
          />
          <OverviewDetail
            icon={<BsBriefcaseFill />}
            heading={profileDictionary.designation}
            text={employees?.designation || "No Designation"}
          />
          <OverviewDetail
            icon={<MdEmail />}
            heading={profileDictionary.email}
            text={
              employees?.personalEmail
                ? employees.personalEmail
                : "johndoe@test.com"
            }
          />
          <OverviewDetail
            icon={<BsHeartFill />}
            heading={profileDictionary.relationship}
            text={MartialStatus(employees?.maritalStatusId)}
          />

          <OverviewDetail
            icon={<MdLocationOn />}
            heading={profileDictionary.livesIn}
            text={employees?.city || "No City"}
          />

          <OverviewDetail
            icon={<FaPhoneAlt />}
            heading={profileDictionary.contact}
            text={employees?.phoneNo ? employees?.phoneNo : "No Phone Number"}
          />

          <OverviewDetail
            icon={<FaHandshake />}
            heading={profileDictionary.joining}
            text={
              moment(employees?.joinDate).format("DD-MM-YYYY")
                ? moment(employees?.joinDate).format("DD-MM-YYYY")
                : "No BirthDay"
            }
          />
          {employees.birthDate && (
            <OverviewDetail
              icon={<FaBirthdayCake />}
              heading={profileDictionary.birthday}
              text={
                moment(employees?.birthDate).format("DD-MM-YYYY")
                  ? moment(employees?.birthDate).format("DD-MM-YYYY")
                  : "No BirthDay"
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default Overview;
