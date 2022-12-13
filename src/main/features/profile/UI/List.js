import React, { useEffect } from "react";
import { Avatar, Dropdown, Menu, Skeleton } from "antd";
import { EllipsisOutlined, SmileOutlined } from "@ant-design/icons";
import { HiDotsHorizontal } from "react-icons/hi";
import { getWorkAction } from "../store/action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function List() {
  const dispatch = useDispatch();
  const { work } = useSelector((state) => state.employeeProfileSlice);
  console.log(work, "work");
  const { id } = useParams();
  useEffect(() => {
    dispatch(getWorkAction("34B0E4F7-7D4A-43B7-8597-525FFC619B84"));
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
              1st menu item
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
              2nd menu item (disabled)
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
              3rd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          key: "4",
          danger: true,
          label: "a danger item",
        },
      ]}
    />
  );

  if (!work) return <Skeleton />;
  return (
    <div className="py-5">
      {work.map((itm) => {
        return (
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <Avatar />
              <div className="flex flex-col">
                <p className="text-base !m-0">
                  {itm.position ? itm.position : "No Position"}
                </p>
                <p className="text-xs text-gray-500">
                  {moment(itm?.startDate).format("DD-MM-YYYY")}-{" "}
                  {moment(itm?.endDate).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <div>
              <Dropdown overlay={menu}>
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

export default List;
