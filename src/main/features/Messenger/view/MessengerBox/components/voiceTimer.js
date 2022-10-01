import React, { useEffect, useState } from 'react';
import recordIcon from "../../../../../../content/NewContent/Messenger/record.png";

function VoiceTimer(props) {
	const [timer, setTimer] = useState(0);
	let timerCount=0
	useEffect(() => {
		let interval = setInterval(() => {
			setTimer(++timerCount)
		}, 1000);
		
	}, []);
	console.log(timer)
	return <div>
		<img style={{ height: "15px", margin: "0 0px 0 10px" }} src={recordIcon} />
		<div style={{ margin: "0 20px 0 10px" }}>00.02</div>
	</div>
}
export default VoiceTimer;
