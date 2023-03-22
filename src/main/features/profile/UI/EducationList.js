import React, { useEffect, useContext } from "react";
import { Avatar, Dropdown, Menu, Skeleton } from "antd";
import { EllipsisOutlined, SmileOutlined } from "@ant-design/icons";
import { HiDotsHorizontal } from "react-icons/hi";
import { getEducationAction } from "../store/action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { profileDictionaryList } from "../localization/index";

function EducationList() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { profileDictionary } = profileDictionaryList[userLanguage];
  const { education } = useSelector((state) => state.employeeProfileSlice);
  console.log(education, "work");
  const { id } = useParams();
  useEffect(() => {
    dispatch(getEducationAction("34B0E4F7-7D4A-43B7-8597-525FFC619B84"));
  }, []);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              {profileDictionary.firstMenu}
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              {profileDictionary.secondMenu}
            </a>
          ),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          key: "3",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              {profileDictionary.thirdMenu}
            </a>
          ),
          disabled: true,
        },
        {
          key: "4",
          danger: true,
          label: profileDictionary.dangerItem,
        },
      ]}
    />
  );

  if (!education) return <Skeleton />;
  return (
    <div className="py-5">
      {education.map((itm) => {
        return (
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <Avatar />
              <div className="flex flex-col">
                <p className="text-base !m-0">
                  {itm.institute ? itm.institute : "No Institute"}
                </p>
                <p className="text-xs text-gray-500">
                  {moment(itm?.startDate).format("DD-MM-YYYY")}-{" "}
                  {moment(itm?.endDate).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <div>
              <Dropdown menu={menu}>
                <div className="!text-2xl !font-bold cursor-pointer hover:bg-[#F4F4F4] rounded-full transition duration-300 p-2">
                  <HiDotsHorizontal className="!text-2xl" />
                </div>
              </Dropdown>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EducationList;
