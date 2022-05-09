import React from "react";
import TravelComposer from "./view/TravelComposer/TravelComposer";
import TravelHeader from "./view/UI/TravelHeader";
import { useMediaQuery } from "react-responsive";
import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";

function Travel() {
	// const [state, setState] = useState(initialState);
	const isTablet = useMediaQuery({ maxWidth: 650 });

	return (
		<>
			<TravelHeader />
			{isTablet && (
				<div className="sideDrawerBtnMobileView">
					<SideDrawer
						children={<TravelComposer />}
						title="Create Travel Expense"
						buttonText=""
						isAccessDrawer={false}
					/>
				</div>
			)}
		</>
	);
}

export default Travel;
