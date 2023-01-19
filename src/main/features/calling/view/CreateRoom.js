import React from "react";
import Header from "../../../layout/header";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import CreateRoomComponent from "./components/createRoom/CreateRoom";

function CreateRoom() {
	return (
		<TabbableContainer>
			<Header />
			<ContBody>
				<CreateRoomComponent />
			</ContBody>
		</TabbableContainer>
	);
}

export default CreateRoom;
