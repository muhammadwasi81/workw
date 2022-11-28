import React from "react";
import { useSelector } from "react-redux";
import WhiteCard from "../../../UI/WhiteCard";
import Chart from "../Chart/Chart";

function DashboardOverview(props) {
	const userSlice = useSelector((state) => state.userSlice);

	return (
		<WhiteCard>
			<div className="flex flex-1">
				<section className="basis-[40%]">
					<div className="flex flex-col gap-3">
						<h1 className="text-primary-color !mb-0 font-semibold text-3xl">
							Hey {userSlice.user.name}, Welcome to your Dashboard!
						</h1>
						<p className="!m-0 font-semibold text-neutral-500">
							Learn practical skills through courses and get paid
							apprenticeships.
						</p>
					</div>
				</section>
				<section className="basis-[60%]">
					<Chart />
				</section>
			</div>
		</WhiteCard>
	);
}

export default DashboardOverview;
