import React from "react";
import WhiteCard from "./WhiteCard";

function Budget() {
	return (
		<WhiteCard className={"text-base"}>
			<div className="flex flex-col gap-2">
				<div className="text-base p-5 bg-neutral-100 flex justify-between rounded-lg">
					<span className="text-primary-color text-base font-semibold">
						Total Budget
					</span>
					<span className="text-black font-semibold">500$</span>
				</div>
				<div className="text-base p-5 bg-neutral-100 flex justify-around rounded-lg font-bold">
					<div className="flex flex-col gap-3 text-center">
						<span className="text-red-600">100$</span>
						<span className="text-gray-500 font-semibold">
							Spent
						</span>
					</div>
					<div className="border-r-2 border-gray-500" />
					<div className="flex flex-col gap-3 text-center">
						<span className="text-green-500">400$</span>
						<span className="text-gray-500 font-semibold">
							Balance
						</span>
					</div>
				</div>
				<div className="text-base p-5 bg-neutral-100 flex flex-col rounded-lg font-bold">
					<div className="border-b-2 border-gray-500 text-center pb-3">
						<span className="text-primary-color text-center w-full">
							Deadline
						</span>
					</div>
					<div className="flex w-full justify-around ">
						<div className="flex flex-col gap-3 text-center pt-3">
							<span className="text-red-600">100$</span>
							<span className="text-gray-500 font-semibold">
								Spent
							</span>
						</div>
						<div className="border-r-2 border-gray-500" />
						<div className="flex flex-col gap-3 text-center pt-3">
							<span className="text-green-500">400$</span>
							<span className="text-gray-500 font-semibold">
								Balance
							</span>
						</div>
					</div>
				</div>
			</div>
		</WhiteCard>
	);
}

export default Budget;
