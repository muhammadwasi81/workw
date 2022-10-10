import React, { useEffect, useState } from 'react';
import recordIcon from "../../../../../../content/NewContent/Messenger/record.png";

function VoiceTimer(props) {
	// const [timer, setTimer] = useState(0);
	const [second, setSecond] = useState("00");
	const [minute, setMinute] = useState("00");
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		let interval = setInterval(() => {
			console.log("Interval")
			const secondCounter = counter % 60;
			const minuteCounter = Math.floor(counter / 60);

			let computedSecond =
				String(secondCounter).length === 1
					? `0${secondCounter}`
					: secondCounter;
			let computedMinute =
				String(minuteCounter).length === 1
					? `0${minuteCounter}`
					: minuteCounter;

			setSecond(computedSecond);
			setMinute(computedMinute);

			setCounter((counter) => counter + 1);
		}, 950);
		return () => clearInterval(interval);
	}, [counter]);
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<img className='recordBlink' style={{ height: "15px", margin: "0 0px 0 10px" }} src={recordIcon} />
			<div style={{ margin: "0 10px 0 10px", width: "30px" }}>{minute}:{second}</div>
		</div>)
}
export default VoiceTimer;
