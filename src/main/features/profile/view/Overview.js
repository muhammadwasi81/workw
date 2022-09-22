import React from "react";
import OverviewDetail from "../UI/OverviewDetail";
import {
	FaGraduationCap,
	FaPhoneAlt,
	FaHandshake,
	FaBirthdayCake,
} from "react-icons/fa";
import { BsBriefcaseFill, BsHeartFill } from "react-icons/bs";
import { MdEmail, MdLocationOn } from "react-icons/md";
function Overview() {
	return (
		<div className="flex flex-col p-3 gap-5 !text-[#85878B] pb-10">
			{/* <p className="px-2 text-black text-[18px] font-semibold">
                Overview
             </p> */}
			<OverviewDetail
				icon={<FaGraduationCap />}
				heading={"Studied A- Levels at"}
				text={
					" Beaconhouse college Programme Defence view Campus, Karachi"
				}
			/>
			<OverviewDetail
				icon={<BsBriefcaseFill />}
				heading={"Designation"}
				text={" Android Developer"}
			/>
			<OverviewDetail
				icon={<MdEmail />}
				heading={"Email"}
				text={" syeddanish1997@gmail.com"}
			/>
			<OverviewDetail
				icon={<BsHeartFill />}
				heading={"Relationship"}
				text={"Single"}
			/>

			<OverviewDetail
				icon={<MdLocationOn />}
				heading={"Lives in"}
				text={"Gulshan e Hadeed"}
			/>

			<OverviewDetail
				icon={<FaPhoneAlt />}
				heading={"Contact"}
				text={"123456789"}
			/>

			<OverviewDetail
				icon={<FaHandshake />}
				heading={"Joining"}
				text={"1/1/1997"}
			/>

			<OverviewDetail
				icon={<FaBirthdayCake />}
				heading={"BirthDay"}
				text={"1/1/1997"}
			/>
		</div>
	);
}

export default Overview;
