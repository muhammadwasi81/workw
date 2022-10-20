import React from "react";
import WhiteCard from "../../../UI/WhiteCard";

function DashboardOverview(props) {
	return (
		<WhiteCard>
			<div className="flex flex-1">
				<section>
					<div className="flex flex-col gap-3">
						<h1 className="text-primary-color !mb-0 font-semibold text-3xl">
							Hey Danish, Welcom to your Dashboard!
						</h1>
						<p className="!m-0 font-semibold text-neutral-500">
							Learn practical skills through courses and get paid
							apprenticeships.
						</p>
					</div>
				</section>
				<section></section>
			</div>
		</WhiteCard>
	);
}

export default DashboardOverview;
