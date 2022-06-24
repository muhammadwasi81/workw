import React from "react";
import { InfoCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Popover, Rate } from "antd";
import { BiWorld } from "react-icons/bi";
import WhiteCard from "../projects/UI/WhiteCard";
import ProjectCover from "../../../content/png/project_cover_img.png";

function ProfileCoverDetail() {
	return (
		<WhiteCard className={"z-10 sticky top-0 w-full mt-[-87px] shadow-md"}>
			<div className="flex w-full justify-between text-base items-center h-[80px]">
				<div className="flex gap-2 items-center px-10">
					<div className="border-4 border-white rounded-lg overflow-hidden -top-8 relative z-50">
						<img src={ProjectCover} alt="" className="h-28 w-28" />
					</div>
					<div className="flex flex-col text-base">
						<span className="text-black text-xl font-extrabold">
							Syed Danish Ali
						</span>
						<span className="text-gray-500 text-sm font-bold flex items-center gap-1">
							Reactjs Developer
						</span>
					</div>
				</div>
				<div className="text-black text-base font-bold flex items-center gap-5">
					<Rate allowHalf defaultValue={2.5} />
					<SettingOutlined className="text-xl !text-primary-color cursor-pointer" />
				</div>
			</div>
		</WhiteCard>
	);
}

export default ProfileCoverDetail;
