// import React from "react";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import DialogActions from "@material-ui/core/DialogActions";
// import Modal from "@material-ui/core/Modal";
// import { makeStyles } from "@material-ui/core/styles";
// // import { AtomSpinner } from "react-epic-spinners";
// import $ from "jquery";
// import { STRINGS } from "../../../utils/base";
// import { API } from "../../../utils/services";
// import { useSelector } from "react-redux";

// function getModalStyle() {
// 	const top = 50;
// 	const left = 50;
// 	return {
// 		top: `${top}%`,
// 		left: `${left}%`,
// 		transform: `translate(-${top}%, -${left}%)`,
// 	};
// }

// const useStyles = makeStyles(theme => ({
// 	paper: {
// 		position: "absolute",
// 		width: 500,
// 		backgroundColor: theme.palette.background.paper,
// 		border: "2px solid #fff",
// 		boxShadow: theme.shadows[5],
// 		// padding: theme.spacing(2, 4, 3),
// 		padding: 15,
// 		borderRadius: 10,
// 	},
// 	privacy_image: { height: "14px", width: "14px" },
// 	errorMessage: {
// 		display: "flex",
// 		color: "red",
// 		width: "100%",
// 		justifyContent: "center",
// 	},
// 	pd_b: { paddingBottom: "10px" },
// 	text_container: { display: "flex", alignItems: "center" },
// 	m_r: { marginLeft: "8px" },
// 	m_t: { marginTop: "13px" },
// }));
// export default function FeedBackComposer(props) {
// 	const [text, settext] = React.useState("");
// 	const classes = useStyles();
// 	const [modalStyle] = React.useState(getModalStyle);
// 	const [isResponse, setIsResponse] = React.useState(true);
// 	const [, /*snackbar*/ setSnackbar] = React.useState({
// 		isOpen: false,
// 		variant: "",
// 		Message: "",
// 	});
// 	const [isEmptyField, setIsEmpty] = React.useState("");
// 	const handleClose = () => {
// 		props.cancel();
// 		settext("");
// 	};

// 	const { user } = useSelector(state => state.userSlice);
// 	const { user_id, fullname } = user;

// 	const handleAccept = () => {
// 		if (text !== "") {
// 			const emailDate = new Date();
// 			let emailMsg = {
// 				attachment: "",
// 				bcc: [],
// 				body: `<p><pre>${text}</pre><pre>User-ID: ${user_id}</pre><pre>User-Name: ${fullname}</pre></p>`,
// 				cc: [],
// 				date: Date.parse(emailDate),
// 				from: [{ email: STRINGS.DEFAULT_EMAIL.FROM }],
// 				id: 1,
// 				subject: `Feed Back From ${fullname}`,
// 				to: [{ email: STRINGS.DEFAULT_EMAIL.TO }],
// 			};
// 			setIsResponse(false);
// 			API.EMAIL.sendMessage(emailMsg).then(response => {
// 				console.log("mail-res", response);
// 				if (response.status) {
// 					console.log("mail-res", response);
// 					setSnackbar({
// 						isOpen: true,
// 						variant: "success",
// 						// Message: `Send Successfully to ${STRINGS.DEFAULT_EMAIL.TO}`,
// 						Message: `Message Send Successfully`,
// 					});
// 					setTimeout(() => {
// 						props.cancel();
// 						setIsResponse(true);
// 					}, 1500);
// 				} else {
// 					setSnackbar({
// 						isOpen: true,
// 						variant: "error",
// 						Message: response.error,
// 					});
// 				}
// 			});
// 			//props.handleAddComment(emailMsg);
// 			settext("");
// 			//props.cancel();
// 		} else {
// 			setIsEmpty("Feed Back Required.");
// 		}
// 	};

// 	const handleOnChange = event => {
// 		settext(event.target.value);
// 		setIsEmpty("");
// 	};

// 	$("#name").keyup(e => {
// 		if (e.keyCode === 13) {
// 			$(".addComment").click();
// 			e.preventDefault();
// 		}
// 	});

// 	// const cancel = () => {
// 	//     setSnackbar({...snackbar,isOpen:false})
// 	// };

// 	const body = (
// 		<div style={modalStyle} className={classes.paper}>
// 			<div id="simple-modal-description" />
// 			<p id="simple-modal-description"> Feed Back</p>
// 			{/* <Dialog
//                 open={props.isDialogOpen}
//                 // onClose={handleClose}
//                 aria-labelledby="form-dialog-title"
//                 Transitionelement={Transition} >
//                 <DialogTitle id="form-dialog-title">
//                     Remarks
//                 </DialogTitle>*/}
// 			{/* {isEmptyField && (<div style={{display:'flex',color:'red',width: '100%',
//                     justifyContent: 'center'}}>{isEmptyField}</div>)}*/}
// 			{isEmptyField && (
// 				<div className={classes.errorMessage}>{isEmptyField}</div>
// 			)}
// 			<div className={`"row" ${classes.pd_b}`}>
// 				{/* <DialogContentText>Enter your remarks.</DialogContentText> */}
// 				<div className={classes.text_container}>
// 					<TextField
// 						autoFocus
// 						margin="dense"
// 						id="name"
// 						type="text"
// 						onKeyUp={e => {
// 							if (e.keyCode === 13) {
// 								handleAccept();
// 							}
// 						}}
// 						onKeyDown={e => {
// 							if (e.keyCode === 13 && !e.shiftKey) {
// 								e.preventDefault();
// 							}
// 						}}
// 						placeholder="Your feed back here"
// 						fullWidth
// 						onChange={handleOnChange}
// 						value={text}
// 						rows={4}
// 						multiline={true}
// 					/>
// 				</div>
// 			</div>
// 			<DialogActions>
// 				<Button onClick={handleClose} color="primary">
// 					Cancel
// 				</Button>
// 				{isResponse ? (
// 					<Button
// 						onClick={handleAccept}
// 						className="addComment"
// 						color="primary"
// 					>
// 						Send
// 					</Button>
// 				) : (
// 					<div className="spinner-holder">
// 						{/* <AtomSpinner className="atomSpinner" /> */}
// 					</div>
// 				)}
// 			</DialogActions>
// 			{/*</Dialog>*/}
// 		</div>
// 	);

// 	return (
// 		// <div>
// 		//     <Dialog
// 		//         open={props.isDialogOpen}
// 		//         // onClose={handleClose}
// 		//         aria-labelledby="form-dialog-title"
// 		//         Transitionelement={Transition} >
// 		//         <DialogTitle id="form-dialog-title">
// 		//             Remarks
// 		//         </DialogTitle>
// 		//         {isEmptyField && (<div style={{display:'flex',color:'red',width: '100%',
// 		//             justifyContent: 'center'}}>{isEmptyField}</div>)}
// 		//         <DialogContent>
// 		//             {/* <DialogContentText>Enter your remarks.</DialogContentText> */}
// 		//             <TextField
// 		//                 autoFocus
// 		//                 margin="dense"
// 		//                 id="name"
// 		//                 // label="Remark"
// 		//                 type="text"
// 		//                 onKeyUp={(e)=> {
// 		//                     if(e.keyCode === 13){
// 		//                         handleAccept()
// 		//                     }
// 		//
// 		//                 } }
// 		//                 onKeyDown={(e)=>{
// 		//                     if(e.keyCode === 13 && !e.shiftKey){
// 		//                         e.preventDefault()
// 		//                     }
// 		//                 }}
// 		//                 placeholder="Type your remarks"
// 		//                 fullWidth
// 		//                 onChange={handleOnChange}
// 		//                 value={text}
// 		//                 multiline={false}
// 		//             />
// 		//         </DialogContent>
// 		//         <DialogActions>
// 		//             <Index onClick={handleClose} color="primary">
// 		//                 Cancel
// 		//             </Index>
// 		//             <Index onClick={handleAccept} className="addComment" color="primary"  >
// 		//                 Done
// 		//             </Index>
// 		//         </DialogActions>
// 		//     </Dialog>
// 		// </div>
// 		<div>
// 			<div>
// 				<Modal
// 					open={props.isDialogOpen}
// 					onClose={handleClose}
// 					aria-labelledby="simple-modal-title"
// 					aria-describedby="simple-modal-description"
// 				>
// 					{body}
// 				</Modal>
// 			</div>
// 		</div>
// 	);
// }
