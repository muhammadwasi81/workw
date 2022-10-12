import React from "react";
import Completed from "../../../../../content/svg/leadManagers/completed.svg";
import Contact from "../../../../../content/svg/leadManagers/conatct_established.svg";
import Contract from "../../../../../content/svg/leadManagers/contract_sent.svg";
import Intrested from "../../../../../content/svg/leadManagers/intrested.svg";
import Introductions from "../../../../../content/svg/leadManagers/Introductions_completed.svg";
import NotIntrested from "../../../../../content/svg/leadManagers/not_intrested.svg";
import Potentials from "../../../../../content/svg/leadManagers/potentials.svg";
import NotInrestedPotential from "../../../../../content/svg/leadManagers/not_interested_p.svg";
const icons = {
	Potential: Potentials,
	"Contact Established": Contact,
	"Introductions Completed": Introductions,
	Interested: Intrested,
	"Contract Sent": Contract,
	"Not Interested (Potential)": NotInrestedPotential,
	"Not Interested": NotIntrested,
	Completed: Completed,
};
function CardHeader({ icon, text, className, count }) {
	return (
		<div className="flex items-center w-full bg-white bg-opacity-20 rounded-lg text-white">
			<div className="bg-white rounded-lg h-full p-1">
				<img
					src={icons[text]}
					alt="icons"
					className="h-[34px] w-[34px]"
				/>
			</div>
			<div className="flex items-center gap-2 w-full  p-2">
				<span className={`${className}`}>{text}</span>
				{/* <span className="ml-auto">{"( " + count + " )"}</span> */}
			</div>
		</div>
	);
}

export default CardHeader;
