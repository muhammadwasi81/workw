import React, { useEffect } from "react";
import { Result } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { verification } from "../../store/actions";
import "../styles/style.css";
// import { STRINGS } from "../../../../../utils/base";
import { ROUTES } from "../../../../../utils/routes";

const Verified = () => {
	const id = useLocation();
	const dispatch = useDispatch();
	const stoken = id.search.split("=");
	console.log(stoken[1], "Token");

	useEffect(() => {
		if (stoken[1]) {
			dispatch(verification(stoken[1]));
		} else {
			alert("token not found");
		}
	}, [stoken[1]]);

	return (
		<div style={{ width: "100%" }} className="verificationScreen">
			{stoken[1] ? (
				<>
					<Result
						status="success"
						title="Thank You!"
						extra={[
							<p>
								We verified your email, you can now{" "}
								<a href={`${ROUTES.ROOT}`}> login </a>
							</p>,
						]}
					/>
				</>
			) : (
				<>
					<Result
						title="You don't have token"
						subTitle="Try Again"
					/>
				</>
			)}
		</div>
	);
};

export default Verified;




// import React, { useEffect, useState } from 'react'
// // import loader from "../../../content/AuthContent/Bars-1.9s-413px.gif"
// import "../styles/style.css"
// // import { Random ,Wave} from 'react-animated-text';
// import {
//     LoadingOutlined
//   } from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
// import { verification } from '../../store/actions';
// // import Spinner from '../../../content/spinner/spinner';
// function Verified() {


//     // const [setId] = useState("")
//     const dispatch = useDispatch()

//     // useEffect(() => {
//     //     const urlParams = new URLSearchParams(window.location.search);
//     //     const token = urlParams.get('token');
//     //     // dispatch(verification(token)).then(x=>console.log(x,"VERIFYRESPONSE",token))

//     //     setId(token)
//     // },[dispatch, setId])

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const token = urlParams.get('token');
//         dispatch(verification(token)).then(x=>console.log(x,"VERIFYRESPONSE",token))
//     },[])

//     return (
//         <div className="loader-div">
//             <h1>Verifiying Your Account !!!</h1>
//             {/* <Wave
//                 text="Verifiying Your Account ..."
//                 effect="jump"
//                 effectChange={2.0}
//                 effectDuration={0.6}
//                 /> */}
//                <LoadingOutlined /> 
//             {/* <img src={loader} alt="" /> */}
//         </div>
//     )
// }

// export default Verified


