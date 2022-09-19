import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { BiWorld } from "react-icons/bi";
import WhiteCard from "./WhiteCard";

function CoverDetail({ detail }) {
	return (
		<WhiteCard className={"z-10 sticky top-0 w-full mt-[-87px] shadow-md"}>
			<div className="flex w-full justify-between text-base items-center">
				<div className="flex flex-col text-base">
					<span className="text-black text-base font-bold">
						{detail?.name}
					</span>
					<span className="text-gray-500 text-sm font-bold flex items-center gap-1">
						<BiWorld /> {detail?.description}
					</span>
				</div>
				<div className="text-black text-base font-bold flex items-center gap-2">
					<Popover content={"Created by: Syed Danish Ali"}>
						<InfoCircleOutlined className="cursor-pointer" />
					</Popover>
					<span>Created by: {detail?.creator.name}</span>
				</div>
			</div>
		</WhiteCard>
	);
}

export default CoverDetail;
