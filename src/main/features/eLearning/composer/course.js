import React, {  } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
// import { StepperFOrm } from "../components/coursesForm";

const CreateCourse = ({ isOpen, handleClose, referenceId, referenceType }) => {

	return (
		<>
			<SideDrawer
				title={"Create Course"}
				isDisable={true}
				isOpen={isOpen}
				isAccessDrawer={false}
				handleClose={handleClose}
			>
				
				{/* <StepperFOrm /> */}
			</SideDrawer>
		</>
	);
};

export default CreateCourse;
