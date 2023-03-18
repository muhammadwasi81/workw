import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogTitle from '@material-ui/core/DialogTitle';
//import Slide from '@material-ui/core/Slide';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
// import {API} from "../../utils/services";
// import {STRINGS} from "../../utils/base";
import "./index.css";
// import '../../stylesheets/index.css';
import { AtomSpinner } from "react-epic-spinners";
import cutIcon from "../../../content/svg/cancel.svg";
import { API } from "../../../utils/services";
import { STRINGS } from "../../../utils/base";
import { COLOR_CODE } from "./enums";

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="down" ref={ref} {...props} />;
// });

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #fff",
		boxShadow: theme.shadows[5],
		// padding: theme.spacing(2, 4, 3),
		padding: 15,
		borderRadius: 10,
	},
	privacy_image: { height: "14px", width: "14px" },
	errorMessage: {
		display: "flex",
		color: "red",
		width: "100%",
		justifyContent: "center",
	},
	pd_b: { paddingBottom: "10px" },
	text_container: { display: "flex", alignItems: "center" },
	m_r: { marginLeft: "8px" },
	m_t: { marginTop: "13px" },
}));

export default function FormDialog(props) {
	const [text, settext] = React.useState("");
	const [amount, setAmount] = React.useState(0);
	const [isUploading, setIsUploading] = React.useState(false);
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [selectedAttachments, setSelectedAttachments] = React.useState([]);
	const [isEmptyField, setIsEmpty] = React.useState("");
	const [loaderViews, setLoaderViews] = React.useState([]);
	// const [attachmentFile, setAttachmentFile] = React.useState([]);
	const handleClose = () => {
		props.cancel();
		setSelectedAttachments([]);
		settext("");
		setAmount(0);
	};

	const validation = (text, amount, selectedAttachments) => {
		let valid = { error: true, message: "" };
		if (props.isAgent !== undefined) {
			if (amount === 0) {
				valid.error = false;
				valid.message += valid.message
					? "\nAmount can not be zero"
					: "Amount can not be zero";
			}
			if (selectedAttachments.length === 0) {
				valid.error = false;
				valid.message += valid.message
					? "\nAttachment Required."
					: "Attachment Required.";
			}
		}
		if (text === "") {
			valid.error = false;
			valid.message += valid.message
				? "\nRemark Required."
				: "Remark Required.";
		}

		return valid;
	};

	const handleAccept = () => {
		let valid = validation(text, amount, selectedAttachments);
		if (valid.error) {
			if (props.isAgent !== undefined) {
				props.handleAccept(text, amount, selectedAttachments);
				setAmount(0);
				setSelectedAttachments([]);
			} else {
				props.handleAccept(text);
			}
			settext("");
			props.cancel();
		} else {
			setIsEmpty(valid.message);
		}
	};

	const handleOnChange = event => {
		if (event.target.type === "number") {
			setAmount(event.target.value);
			setIsEmpty("");
		} else {
			settext(event.target.value);
			setIsEmpty("");
		}
	};
	const handleImageChange = ({ target }) => {
		const { files } = target;

		if (files && files[0]) {
			setLoaderViews([...files]);
			setIsUploading(true);
			API.FILES.upload(files).then(response => {
				if (response[STRINGS.RESPONSE.status]) {
					setSelectedAttachments(
						selectedAttachments.concat(response.data)
					);
					setLoaderViews([]);
					setIsUploading(false);
				} else {
					setLoaderViews([]);
				}
			});
		}
	};

	const handleRemoveAttachment = i => {
		setSelectedAttachments(
			selectedAttachments.filter((d, index) => index !== i)
		);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<div id="simple-modal-description" />
			<p id="simple-modal-description">
				{props.actionName === "Execute"
					? "Enter your remarks."
					: props.actionName === "Cancel"
					? "Write your remarks."
					: props.actionName === "Accept"
					? "Write your remarks."
					: props.actionName === "Decline"
					? "Write your remarks."
					: null}
			</p>
			{/* <Dialog
                open={props.isDialogOpen}
                // onClose={handleClose}
                aria-labelledby="form-dialog-title"
                Transitionelement={Transition} >
                <DialogTitle id="form-dialog-title">
                    Remarks
                </DialogTitle>*/}
			{/* {isEmptyField && (<div style={{display:'flex',color:'red',width: '100%',
                    justifyContent: 'center'}}>{isEmptyField}</div>)}*/}
			{isEmptyField && (
				<div className={classes.errorMessage}>{isEmptyField}</div>
			)}
			<div className={`"row" ${classes.pd_b}`}>
				{/* <DialogContentText>Enter your remarks.</DialogContentText> */}
				<div className={""}>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						// label="Remark"
						type="text"
						placeholder="Write here..."
						onKeyUp={e => {
							if (e.keyCode === 13) {
								handleAccept();
							}
						}}
						fullWidth
						onChange={handleOnChange}
						value={text}
						multiline={false}
					/>
				</div>

				{props.isAgent !== undefined && (
					<div className={""}>
						<TextField
							margin="dense"
							id="amount"
							label="Amount"
							type="number"
							placeholder="Write here..."
							onKeyUp={e => {
								if (e.keyCode === 13) {
									handleAccept();
								}
							}}
							fullWidth
							onChange={handleOnChange}
							value={amount}
							multiline={false}
						/>
						<br />

						<div
							className="localImgCont"
							style={{
								height:
									selectedAttachments.length !== 0 ||
									loaderViews.length !== 0
										? "70px"
										: "min-content",
								padding: "0",
							}}
						>
							{selectedAttachments.map(
								(
									{ extensionType, path, attachmentName },
									i
								) => (
									<div
										key={`bottomChatAttachmentImage${i}`}
										className="imageDiv"
										style={{
											backgroundImage: `url(${path})`,
											backgroundRepeat: `no-repeat`,
											backgroundSize: "contain",
											backgroundPosition: "center",
										}}
									>
										{/* <h1>aaaa</h1>    */}
										<div
											className="cut"
											onClick={e => {
												e.stopPropagation();
												handleRemoveAttachment(i);
											}}
										>
											{/*<i className="ic-cut"/>*/}
											<img alt={"#"} src={cutIcon} />
										</div>
									</div>
								)
							)}
							{isUploading && (
								<div className="atomSpinner">
									<AtomSpinner
										size={33}
										color={COLOR_CODE.SPINNER_COLOR}
									/>
								</div>
							)}
						</div>

						<br />
						<div className="options">
							<div
								className="capture extraMargin"
								onChange={handleImageChange}
							>
								<i className="ic-gallery" />
								<input
									className="picker picture"
									type="file"
									name="pictures"
									accept=".jpg, .jpeg, .gif, .bmp, .png"
									multiple
								/>
							</div>

							<div
								className="opt"
								// onClick={this.handleComposerSubmit}
							>
								<i className="ic-send" />
							</div>
						</div>
					</div>
				)}
			</div>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleAccept} color="primary">
					{/* {props.action === 2 ? 'Accept' : 'Decline'} */}
					{props.actionName === "Execute"
						? "Execute"
						: props.actionName === "Cancel"
						? "Decline"
						: props.actionName === "Accept"
						? "Accept"
						: props.actionName === "Decline"
						? "Decline"
						: null}
				</Button>
			</DialogActions>
			{/*</Dialog>*/}
		</div>
	);
	// return (
	//     <div>
	//         <Dialog
	//             open={props.isdialogOpen}
	//             // onClose={handleClose}
	//             aria-labelledby="form-dialog-title"
	//             Transitionelement={Transition} >
	//             <DialogTitle
	//                 id="form-dialog-title">
	//                 {props.actionName === "Execute" ? "Enter your remarks.": props.actionName === "Cancel" ? "Write your remarks." : props.actionName === "Accept" ? "Write your remarks.": props.actionName === "Decline" ? "Write your remarks.":null}
	//             </DialogTitle>
	//             <DialogContent>
	//                 {/* <DialogContentText>Enter your remarks.</DialogContentText> */}
	//                 <TextField
	//                     autoFocus
	//                     margin="dense"
	//                     id="name"
	//                     // label="Remark"
	//                     type="text"
	//                     placeholder="Write here..."
	//                     onKeyUp={(e)=> {
	//                         if(e.keyCode === 13){
	//                             handleAccept()
	//                         }
	//
	//                     } }
	//                     fullWidth
	//                     onChange={handleOnChange}
	//                     value={text}
	//                     multiline={false}
	//                 />
	//             </DialogContent>
	//             <DialogActions>
	//                 <Index onClick={handleClose} color="primary">
	//                     Cancel
	//                 </Index>
	//                 <Index onClick={handleAccept} color="primary"  >
	//                     {/* {props.action === 2 ? 'Accept' : 'Decline'} */}
	//                     {props.actionName === "Execute" ? "Execute": props.actionName === "Cancel" ? "Decline" : props.actionName === "Accept" ? "Accept": props.actionName === "Decline" ? "Decline":null}
	//                 </Index>
	//             </DialogActions>
	//         </Dialog>
	//     </div>
	// );
	return (
		<div>
			<div>
				<Modal
					open={props.isDialogOpen ? props.isDialogOpen : false}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					{body}
				</Modal>
			</div>
		</div>
	);
}
