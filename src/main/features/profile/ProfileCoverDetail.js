import { useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import WhiteCard from "../projects/UI/WhiteCard";
import ProjectCover from "../../../content/avatarProfile.svg";
import profile from "../../../content/profile.svg";

import { useDispatch, useSelector } from "react-redux";
import { getEmployeeByIdAction } from "./store/action";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";

function ProfileCoverDetail({ id }) {
  const dispatch = useDispatch();
  const { employees, loader } = useSelector(
    (state) => state.employeeProfileSlice
  );
  console.log(employees, "employeeData mera slice");

  useEffect(() => {
    dispatch(getEmployeeByIdAction(id));
  }, [id]);

  return (
    <WhiteCard className={"z-10 sticky top-0 w-full mt-[-87px] shadow-md"}>
      <div className="flex w-full justify-between text-base items-center h-[80px]">
        <div className="flex gap-2 items-center px-10">
          {loader ? (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          ) : (
            <>
              <div className="border-4 border-white rounded-lg overflow-hidden -top-8 relative z-50">
                <img
                  src={employees?.image ? employees?.image : profile}
                  alt="avatar"
                  loading="lazy"
                  className="h-28 w-28"
                />
              </div>
              <div className="flex flex-col text-base">
                <span className="text-black text-xl font-extrabold">
                  {`${employees?.firstName} ${employees?.lastName}`}
                </span>
                <span className="text-gray-500 text-sm font-bold flex items-center gap-1">
                  {employees?.designation || "No Designation"}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="text-black text-base font-bold flex items-center gap-5">
          <Rate allowHalf defaultValue={2.5} />
          <Link to="/settings">
            <SettingOutlined className="text-xl !text-primary-color cursor-pointer" />
          </Link>
        </div>
      </div>
    </WhiteCard>
  );
}

export default ProfileCoverDetail;
